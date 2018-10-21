import path from 'path';
import gql from 'graphql-tag';
import { pull } from 'lodash';
import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import {
  TOTAL_SIZE,
  BLOCK_SIZE,
  COUNT,
  COUNT_COLUMNS,
} from '../../../../classes/constants';
import Struct from '../../../../classes/Struct';
import BufferGenerator from '../../../../classes/BufferGenerator';
import * as ITEM_TYPES from '../../../../structs/item_types';
import serverItemstrReaderStruct from '../../../../structs/server/itemstr/reader_struct';
import { getFiniteByTypeName } from '../../../../structs/item_types_utils';
import { getReleaseFilesPath } from '../../../../utils/path';
import { mkdirSync, writeFile } from '../../../../utils/fs';
import { RELEASE_FILES_SERVER_FOLDER } from '../../../../utils/constants';
import apolloClient from '../../../../apollo';
import projectItemsTotalQuery from '../../../../apollo/queries/sub/items_total';

const TypeToReaderStruct = {};

// generate readers
pull(
  Object.values(ITEM_TYPES),
  ITEM_TYPES.COMBINEDATA,
  ITEM_TYPES.MAKEDATA,
  ITEM_TYPES.UNK3,
).forEach(type => {
  try {
    TypeToReaderStruct[
      type
    ] = require(`../../../../structs/server/item/${type}_reader`).struct; // eslint-disable-line
  } catch (err) {
    console.warn(err); // eslint-disable-line
  }
});

function buildQueryObjects(fieldNames = []) {
  return gql`
    query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
      items(take: $take, skip: $skip, sort: $sort, where: $where) {
        items {
          id
          type
          nIndex
          server {
            ${fieldNames instanceof Array ? fieldNames.join('\n') : fieldNames}
          }
        }
        total
      }
    }
  `;
}

function* loadObjects({ type, projectId, fieldNames, loaded, changeLoaded }) {
  let nextLoaded = loaded;
  const objects = [];
  const QUERY_OBJECTS = buildQueryObjects(fieldNames);

  // eslint-disable-next-line
  while (true) {
    const result = yield apolloClient.query({
      query: QUERY_OBJECTS,
      variables: {
        skip: objects.length,
        take: 100,
        sort: { nIndex: 1 },
        where: { type, projectId },
      },
    });

    objects.push(...result.data.items.items);
    nextLoaded += result.data.items.items.length;

    yield put(changeLoaded(nextLoaded));

    if (result.data.items.items.length <= 0) {
      break;
    }
  }

  return objects;
}

function fillBuffer(
  bufferGenerator,
  { block, header },
  objects = [],
  fnValues,
) {
  const blockFields = block.getFields();
  const headerFields = header instanceof Struct ? header.getFields() : header;

  const headerValues = {
    [TOTAL_SIZE]: block.getWeight() * objects.length + 8,
    [BLOCK_SIZE]: block.getWeight(),
    [COUNT]: objects.length,
    [COUNT_COLUMNS]: blockFields.length,
  };

  headerFields.forEach(field => {
    bufferGenerator.addByField(field, headerValues[field.getName()]);
  });

  const buffers = [];
  objects.forEach(object => {
    const values = typeof fnValues === 'function' ? fnValues(object) : {};
    const buffer = new BufferGenerator();
    blockFields.forEach(field => {
      buffer.addByField(field, values[field.getName()], undefined, values);
    });
    buffers.push(buffer.getBuffer());
  });

  bufferGenerator.concat(...buffers);
}

/**
 * Export Server Items Resolver
 */
export default function* defaultSaga({ projectId, actions, fileData }) {
  yield delay(1000);
  const { type } = fileData.args;

  const readerStruct = TypeToReaderStruct[type];
  const total = yield apolloClient.query({
    query: projectItemsTotalQuery,
    variables: { where: { projectId, type } },
  });

  yield put(actions.changeTotal(total.data.items.total));

  let i = 0;
  let loaded = 0;

  const bufferGenerator = new BufferGenerator();
  const strBufferGenerator = new BufferGenerator();

  while (readerStruct.length > i) {
    const objects = yield loadObjects({
      type,
      projectId,
      fieldNames: pull(
        readerStruct[i].block.getFieldNames(),
        'nIndex',
        'nType',
      ),
      loaded,
      changeLoaded: actions.changeLoaded,
    });

    loaded += objects.length;

    // item
    fillBuffer(bufferGenerator, readerStruct[i], objects, object => ({
      ...object.server,
      nType: getFiniteByTypeName(object.type),
      nIndex: object.nIndex,
    }));

    // itemstr
    fillBuffer(
      strBufferGenerator,
      serverItemstrReaderStruct[i],
      objects,
      object => ({
        nIndex: object.nIndex,
        strCode: object.server.strCode,
        strKo: '-',
        strBr: '-',
        strCh: '-',
        strEn: '-',
        strIn: '-',
        strJa: '-',
        strPh: '-',
        strRu: '-',
        strTa: '-',
        strVi: '-',
        strGlobal: object.server.strName,
      }),
    );

    i += 1;
  }

  const parsePath = path.parse(fileData.path);
  const fileDir = parsePath.dir;

  yield mkdirSync(
    getReleaseFilesPath(projectId, RELEASE_FILES_SERVER_FOLDER, fileDir),
  );

  yield writeFile(
    getReleaseFilesPath(
      projectId,
      RELEASE_FILES_SERVER_FOLDER,
      fileDir,
      parsePath.base,
    ),
    bufferGenerator.getBuffer(),
  );

  yield writeFile(
    getReleaseFilesPath(
      projectId,
      RELEASE_FILES_SERVER_FOLDER,
      fileDir,
      `${parsePath.name}_str${parsePath.ext || '.dat'}`,
    ),
    strBufferGenerator.getBuffer(),
  );
}
