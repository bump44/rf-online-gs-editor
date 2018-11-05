import { delay } from 'redux-saga';
import { pull } from 'lodash';
import { put } from 'redux-saga/effects';
import gql from 'graphql-tag';

import {
  TOTAL_SIZE,
  BLOCK_SIZE,
  COUNT,
  COUNT_COLUMNS,
} from '~/classes/constants';

import Struct from '~/classes/Struct';
import BufferGenerator from '~/classes/BufferGenerator';
import { struct as activeReaderStruct } from '~/structs/server/map/active_reader';
import { getReleaseFilesPath } from '~/utils/path';
import { mkdirSync, writeFile } from '~/utils/fs';
import { RELEASE_FILES_SERVER_FOLDER } from '~/utils/constants';
import apolloClient from '~/apollo';
import totalQuery from '~/apollo/queries/sub/mapActives_total';

function buildQueryObjects(fieldNames = []) {
  return gql`
    query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
      mapActives(take: $take, skip: $skip, sort: $sort, where: $where) {
        items {
          id
          mapName
          activeName
          nIndex
          ${fieldNames instanceof Array ? fieldNames.join('\n') : fieldNames}
        }
        total
      }
    }
  `;
}

function* loadObjects({
  projectId,
  mapName,
  fieldNames,
  loaded,
  changeLoaded,
}) {
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
        where: { projectId, mapName },
      },
    });

    objects.push(...result.data.mapActives.items);
    nextLoaded += result.data.mapActives.items.length;

    yield put(changeLoaded(nextLoaded));

    if (result.data.mapActives.items.length <= 0) {
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

function filtrateData(obj = {}) {
  const nextObject = {};
  return Object.assign({}, obj, nextObject);
}

/**
 * Export Server Map Active Resolver
 */
export default function* defaultSaga({
  projectId,
  actions,
  mapName,
  releasePath,
}) {
  yield delay(1000);

  const readerStruct = activeReaderStruct;
  const total = yield apolloClient.query({
    query: totalQuery,
    variables: { where: { projectId, mapName } },
  });

  yield put(actions.changeTotal(total.data.mapActives.total));

  const activeGroups = {};

  let i = 0;
  let loaded = 0;

  while (readerStruct.length > i) {
    const objects = yield loadObjects({
      projectId,
      mapName,
      fieldNames: pull(readerStruct[i].block.getFieldNames(), 'nIndex'),
      loaded,
      changeLoaded: actions.changeLoaded,
    });

    loaded += objects.length;

    objects.forEach(object => {
      activeGroups[object.activeName] = [
        ...(activeGroups[object.activeName] || []),
        object,
      ];
    });

    i += 1;
  }

  yield mkdirSync(
    getReleaseFilesPath(
      releasePath,
      RELEASE_FILES_SERVER_FOLDER,
      'Map',
      mapName,
    ),
  );

  yield Promise.all(
    Object.keys(activeGroups).map(activeName => {
      const bufferGenerator = new BufferGenerator();
      const activeBlocks = activeGroups[activeName];
      fillBuffer(bufferGenerator, readerStruct[0], activeBlocks, filtrateData);

      return writeFile(
        getReleaseFilesPath(
          releasePath,
          RELEASE_FILES_SERVER_FOLDER,
          'Map',
          mapName,
          `${activeName}.dat`,
        ),
        bufferGenerator.getBuffer(),
      );
    }),
  );
}
