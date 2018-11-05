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
import { struct as portalReaderStruct } from '~/structs/server/map/portal_reader';
import { getReleaseFilesPath } from '~/utils/path';
import { mkdirSync, writeFile } from '~/utils/fs';
import { RELEASE_FILES_SERVER_FOLDER } from '~/utils/constants';
import apolloClient from '~/apollo';
import totalQuery from '~/apollo/queries/sub/mapPortals_total';

function buildQueryObjects(fieldNames = []) {
  return gql`
    query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
      mapPortals(take: $take, skip: $skip, sort: $sort, where: $where) {
        items {
          id
          mapName
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

    objects.push(...result.data.mapPortals.items);
    nextLoaded += result.data.mapPortals.items.length;

    yield put(changeLoaded(nextLoaded));

    if (result.data.mapPortals.items.length <= 0) {
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
  const nextObject = {};

  nextObject.strLinkMapCode =
    mapNameTypeCaseSens[obj.strLinkMapCode] || obj.strLinkMapCode || '0';

  nextObject.strLinkPortalCode = obj.strLinkPortalCode || '0';
  nextObject.strMenu = obj.strMenu || '0';

  nextObject.strNeedItemCode__1_1 = obj.strNeedItemCode__1_1 || '-1';
  nextObject.strNeedItemCode__2_1 = obj.strNeedItemCode__2_1 || '-1';
  nextObject.strNeedItemCode__3_1 = obj.strNeedItemCode__3_1 || '-1';

  return Object.assign({}, obj, nextObject);
}

/**
 * Export Server Map Portal Resolver
 */
export default function* defaultSaga({
  projectId,
  actions,
  mapName,
  releasePath,
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

  const readerStruct = portalReaderStruct;
  const total = yield apolloClient.query({
    query: totalQuery,
    variables: { where: { projectId, mapName } },
  });

  yield put(actions.changeTotal(total.data.mapPortals.total));

  let i = 0;
  let loaded = 0;

  const bufferGenerator = new BufferGenerator();

  while (readerStruct.length > i) {
    const objects = yield loadObjects({
      projectId,
      mapName,
      fieldNames: pull(readerStruct[i].block.getFieldNames(), 'nIndex'),
      loaded,
      changeLoaded: actions.changeLoaded,
    });

    loaded += objects.length;
    fillBuffer(bufferGenerator, readerStruct[i], objects, object =>
      filtrateData(object, { mapNameTypeCaseSens }),
    );

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

  yield writeFile(
    getReleaseFilesPath(
      releasePath,
      RELEASE_FILES_SERVER_FOLDER,
      'Map',
      mapName,
      `${mapName}-[PORTAL].dat`,
    ),
    bufferGenerator.getBuffer(),
  );
}
