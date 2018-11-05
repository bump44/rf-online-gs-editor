import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import gql from 'graphql-tag';

import { getReleaseFilesPath } from '~/utils/path';
import { mkdirSync, writeFile } from '~/utils/fs';
import { RELEASE_FILES_SERVER_FOLDER } from '~/utils/constants';

import apolloClient from '~/apollo';
import totalQuery from '~/apollo/queries/sub/mapSpts_total';

function buildQueryObjects() {
  return gql`
    query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
      mapSpts(take: $take, skip: $skip, sort: $sort, where: $where) {
        items {
          id
          strAnchor
          a1
          a2
          a3
          a4
          a5
          a6
          bExcludeNodeTm
          b1
          b2
          b3
          b4
          c1
          c2
          c3
          c4
          d1
          d2
          d3
          d4
          e1
          e2
          e3
          e4
        }
        total
      }
    }
  `;
}

function* loadObjects({ projectId, mapName, loaded, changeLoaded }) {
  let nextLoaded = loaded;
  const objects = [];
  const QUERY_OBJECTS = buildQueryObjects();

  // eslint-disable-next-line
  while (true) {
    const result = yield apolloClient.query({
      query: QUERY_OBJECTS,
      variables: {
        skip: objects.length,
        take: 100,
        sort: {},
        where: { projectId, mapName },
      },
    });

    objects.push(...result.data.mapSpts.items);
    nextLoaded += result.data.mapSpts.items.length;

    yield put(changeLoaded(nextLoaded));

    if (result.data.mapSpts.items.length <= 0) {
      break;
    }
  }

  return objects;
}

/**
 * Export Server Map Spt Resolver
 */
export default function* defaultSaga({
  projectId,
  actions,
  mapName,
  mapNameType,
  releasePath,
}) {
  yield delay(1000);

  const total = yield apolloClient.query({
    query: totalQuery,
    variables: { where: { projectId, mapName } },
  });

  yield put(actions.changeTotal(total.data.mapSpts.total));

  const objects = yield loadObjects({
    projectId,
    mapName: mapNameType.get('value'),
    loaded: 0,
    changeLoaded: actions.changeLoaded,
  });

  const arrayBlocks = [];

  objects.forEach(object => {
    if (!object.strAnchor) {
      return;
    }

    const arrayBlock = [
      [
        `*${object.strAnchor}`,
        object.a1,
        object.a2,
        object.a3,
        '\t',
        object.a4,
        object.a5,
        object.a6,
      ].join('\t'),
    ];

    if (object.bExcludeNodeTm) {
      arrayBlock.push('-node_tm');
    }

    arrayBlock.push(
      [
        object.b1.toFixed(6),
        object.b2.toFixed(6),
        object.b3.toFixed(6),
        object.b4.toFixed(6),
      ].join('\t'),
    );
    arrayBlock.push(
      [
        object.c1.toFixed(6),
        object.c2.toFixed(6),
        object.c3.toFixed(6),
        object.c4.toFixed(6),
      ].join('\t'),
    );
    arrayBlock.push(
      [
        object.d1.toFixed(6),
        object.d2.toFixed(6),
        object.d3.toFixed(6),
        object.d4.toFixed(6),
      ].join('\t'),
    );
    arrayBlock.push(
      [
        object.e1.toFixed(6),
        object.e2.toFixed(6),
        object.e3.toFixed(6),
        object.e4.toFixed(6),
      ].join('\t'),
    );

    arrayBlocks.push(arrayBlock.join('\n'));
  });

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
      `${mapName}.spt`,
    ),
    [
      'script_begin',
      '[HelperObjectBegin]',
      ...arrayBlocks,
      '[HelperObjectEnd]',
      'script_end',
    ].join('\n\n'),
  );
}
