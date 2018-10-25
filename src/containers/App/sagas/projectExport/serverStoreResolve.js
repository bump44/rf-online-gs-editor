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
} from '~/classes/constants';

import Struct from '~/classes/Struct';
import BufferGenerator from '~/classes/BufferGenerator';
import serverStoreReaderStruct from '~/structs/server/store/reader_struct';
import serverStrReaderStruct from '~/structs/server/str/reader_struct';
import { getReleaseFilesPath } from '~/utils/path';
import { mkdirSync, writeFile } from '~/utils/fs';
import { RELEASE_FILES_SERVER_FOLDER } from '~/utils/constants';
import apolloClient from '~/apollo';
import storesTotalQuery from '~/apollo/queries/sub/stores_total';

function buildQueryObjects(fieldNames = []) {
  return gql`
    query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
      stores(take: $take, skip: $skip, sort: $sort, where: $where) {
        items {
          id
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

function filtrateData(obj = {}, { mapNameTypeCaseSens } = {}) {
  const itemCodeFields = Array.from(Array(216)).map(
    (_, index) =>
      index >= 200
        ? `strLimItemCode__${index - 200 + 1}_1`
        : `strItemCode__${index + 1}`,
  );

  const nextObject = {};

  itemCodeFields.forEach(code => {
    if (!obj[code] || obj[code].length !== 7) {
      nextObject[code] = '0'; // server must contain zero if item is not specified
    }
  });

  nextObject.strStoreMAPcode =
    mapNameTypeCaseSens[obj.strStoreMAPcode] || obj.strStoreMAPcode;

  return Object.assign({}, obj, nextObject);
}

/**
 * Export Server Stores Resolver
 */
export default function* defaultSaga({
  projectId,
  actions,
  fileData,
  projectDetails,
}) {
  yield delay(1000);

  const mapNameTypeCaseSens = {};

  projectDetails
    .get('mapNameTypes')
    .get('items')
    .forEach(mapNameType => {
      mapNameTypeCaseSens[mapNameType.get('value')] =
        mapNameType.get('caseSens') || mapNameType.get('value');
    });

  const readerStruct = serverStoreReaderStruct;
  const total = yield apolloClient.query({
    query: storesTotalQuery,
    variables: { where: { projectId } },
  });

  yield put(actions.changeTotal(total.data.stores.total));

  let i = 0;
  let loaded = 0;

  const bufferGenerator = new BufferGenerator();
  const strBufferGenerator = new BufferGenerator();

  while (readerStruct.length > i) {
    const objects = yield loadObjects({
      projectId,
      fieldNames: pull(readerStruct[i].block.getFieldNames(), 'nIndex'),
      loaded,
      changeLoaded: actions.changeLoaded,
    });

    loaded += objects.length;
    fillBuffer(bufferGenerator, readerStruct[i], objects, object => ({
      ...filtrateData(object.server, { mapNameTypeCaseSens }),
      nIndex: object.nIndex,
    }));

    // storestr
    fillBuffer(
      strBufferGenerator,
      serverStrReaderStruct[i],
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
