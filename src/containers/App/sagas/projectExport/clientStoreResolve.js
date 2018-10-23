import { delay } from 'redux-saga';
import { pull } from 'lodash';
import { put } from 'redux-saga/effects';
import gql from 'graphql-tag';
import path from 'path';

import {
  TOTAL_SIZE,
  BLOCK_SIZE,
  COUNT,
  COUNT_COLUMNS,
} from 'classes/constants';

import Struct from 'classes/Struct';
import BufferGenerator from 'classes/BufferGenerator';
import clientStoreReaderStruct from 'structs/client/store/reader_struct';
import { getReleaseFilesPath } from 'utils/path';
import { mkdirSync, writeFile } from 'utils/fs';
import { enCryptByBuf } from 'utils/edf';
import {
  RELEASE_FILES_CLIENT_FOLDER,
  RELEASE_FILES_CLIENTDAT_FOLDER,
} from 'utils/constants';

import apolloClient from 'apollo';
import storesTotalQuery from 'apollo/queries/sub/stores_total';

function buildQueryObjects(fieldNames = []) {
  return gql`
    query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
      stores(take: $take, skip: $skip, sort: $sort, where: $where) {
        items {
          id
          nIndex
          client {
            ${fieldNames instanceof Array ? fieldNames.join('\n') : fieldNames}
          }
        }
        total
      }
    }
  `;
}

function* loadObjects({ projectId, fieldNames, loaded, changeLoaded }) {
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
        where: { projectId },
      },
    });

    objects.push(...result.data.stores.items);
    nextLoaded += result.data.stores.items.length;

    yield put(changeLoaded(nextLoaded));

    if (result.data.stores.items.length <= 0) {
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
 * Export Client Stores Resolver
 */
export default function* defaultSaga({ projectId, actions, fileData }) {
  yield delay(1000);
  const parsePath = path.parse(fileData.path);
  const fileName = parsePath.name;
  const fileDir = parsePath.dir;
  const bufferGenerator = new BufferGenerator();

  const readerStruct = clientStoreReaderStruct;
  const total = yield apolloClient.query({
    query: storesTotalQuery,
    variables: { where: { projectId } },
  });

  yield put(actions.changeTotal(total.data.stores.total));

  let i = 0;
  let loaded = 0;

  while (readerStruct.length > i) {
    const objects = yield loadObjects({
      projectId,
      fieldNames: pull(readerStruct[i].block.getFieldNames(), 'nIndex'),
      loaded,
      changeLoaded: actions.changeLoaded,
    });

    loaded += objects.length;
    fillBuffer(bufferGenerator, readerStruct[i], objects, object => ({
      ...object.client,
      nIndex: object.nIndex,
    }));

    i += 1;
  }

  yield mkdirSync(
    getReleaseFilesPath(projectId, RELEASE_FILES_CLIENT_FOLDER, fileDir),
  );

  yield mkdirSync(
    getReleaseFilesPath(projectId, RELEASE_FILES_CLIENTDAT_FOLDER, fileDir),
  );

  yield writeFile(
    getReleaseFilesPath(
      projectId,
      RELEASE_FILES_CLIENTDAT_FOLDER,
      fileDir,
      `${fileName}.dat`,
    ),
    bufferGenerator.getBuffer(),
  );

  yield writeFile(
    getReleaseFilesPath(
      projectId,
      RELEASE_FILES_CLIENT_FOLDER,
      fileDir,
      `${fileName}.edf`,
    ),
    yield enCryptByBuf(bufferGenerator.getBuffer()),
  );
}
