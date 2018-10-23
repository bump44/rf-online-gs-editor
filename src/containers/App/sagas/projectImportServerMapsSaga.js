import { flatten } from 'lodash';
import { Map } from 'immutable';
import path from 'path';

import {
  take,
  call,
  put,
  all,
  fork,
  cancel,
  cancelled,
  select,
} from 'redux-saga/effects';

import apolloClient from 'apollo';
import { isExists } from 'utils/fs';
import { normalize } from 'utils/string';

import {
  PROJECTS_IMPORTS_SERVER_MAPS_START_MAP_IMPORT,
  PROJECTS_IMPORTS_SERVER_MAPS_CANCEL_MAP_IMPORT,
  CANCELLED,
  PROCESSING,
  ERROR,
  FINISHED,
  IMMUTABLE_MAP,
  PROJECTS_IMPORTS_SERVER_MAPS_REMOVE,
} from '../constants';

import serverMapSptResolve from './projectImport/serverMapSptResolve';
import serverMapBlockResolve from './projectImport/serverMapBlockResolve';
import serverMapActiveResolve from './projectImport/serverMapActiveResolve';
import serverMapPortalResolve from './projectImport/serverMapPortalResolve';

import { projectsImportsServerMapsBindActionsWithMapName } from '../actions';
import { makeSelectProjectsImportsServerMaps } from '../selectors';

const Workers = {};

export function* changeMapStateToCancelled({ projectId, mapName, actions }) {
  const fns =
    actions ||
    projectsImportsServerMapsBindActionsWithMapName({
      projectId,
      mapName,
    });

  yield put(fns.changeStatus(CANCELLED));
}

export function* changeMapStateToProcessing({ projectId, mapName, actions }) {
  const fns =
    actions ||
    projectsImportsServerMapsBindActionsWithMapName({
      projectId,
      mapName,
    });

  yield put(fns.changeStatus(PROCESSING));
  yield put(fns.changeCountTotal(0));
  yield put(fns.changeCountCompleted(0));
  yield put(fns.changeErrorMessage(''));
}

export function* changeMapStateToError({ projectId, mapName, actions, error }) {
  const fns =
    actions ||
    projectsImportsServerMapsBindActionsWithMapName({
      projectId,
      mapName,
    });

  yield put(fns.changeStatus(ERROR));
  yield put(fns.changeErrorMessage(error.message));
}

export function* changeMapStateToFinished({ projectId, mapName, actions }) {
  const fns =
    actions ||
    projectsImportsServerMapsBindActionsWithMapName({
      projectId,
      mapName,
    });

  yield put(fns.changeStatus(FINISHED));
}

export function* resolveSpt({
  mapName,
  mapPath,
  projectId,
  importType,
  actions,
}) {
  const sptPath = path.resolve(mapPath, `${mapName}.spt`);
  const fileIsExists = yield call(isExists, sptPath);

  yield put(actions.changeMessage(sptPath));

  if (!fileIsExists) {
    return null;
  }

  return yield call(serverMapSptResolve, {
    projectId,
    mapName,
    projectImportState: Map({
      filePath: sptPath,
      importType,
    }),
    actions,
  });
}

export function* resolvePortal({
  mapName,
  mapPath,
  projectId,
  importType,
  actions,
}) {
  const portalPath = path.resolve(mapPath, `${mapName}-[PORTAL].dat`);
  const fileIsExists = yield call(isExists, portalPath);

  yield put(actions.changeMessage(portalPath));

  if (!fileIsExists) {
    return null;
  }

  return yield call(serverMapPortalResolve, {
    projectId,
    mapName,
    projectImportState: Map({
      filePath: portalPath,
      importType,
    }),
    actions,
  });
}

export function* resolveBlock({
  mapName,
  mapPath,
  projectId,
  importType,
  actions,
}) {
  const blockPath = path.resolve(mapPath, `${mapName}-[BLOCK].dat`);
  const fileIsExists = yield call(isExists, blockPath);

  yield put(actions.changeMessage(blockPath));

  if (!fileIsExists) {
    return null;
  }

  return yield call(serverMapBlockResolve, {
    projectId,
    mapName,
    projectImportState: Map({
      filePath: blockPath,
      importType,
    }),
    actions,
  });
}

export function* resolveActive({
  mapName,
  mapPath,
  fileName,
  projectId,
  importType,
  actions,
}) {
  const activePath = path.resolve(mapPath, `${fileName}.dat`);
  const fileIsExists = yield call(isExists, activePath);

  yield put(actions.changeMessage(activePath));

  if (!fileIsExists) {
    return null;
  }

  return yield call(serverMapActiveResolve, {
    projectId,
    mapName,
    activeName: fileName,
    projectImportState: Map({
      filePath: activePath,
      importType,
    }),
    actions,
  });
}

export function* worker({ projectId, mapName, importType }) {
  const projectsImportsServerMapsState = yield select(
    makeSelectProjectsImportsServerMaps(),
  );
  const projectImportServerMapState = projectsImportsServerMapsState.getIn(
    [projectId, mapName],
    IMMUTABLE_MAP,
  );

  const actions = projectsImportsServerMapsBindActionsWithMapName({
    projectId,
    mapName,
  });

  try {
    yield call(changeMapStateToProcessing, { actions });

    // use fallback import type
    const nextProjectImportServerMapState = projectImportServerMapState.set(
      'importType',
      projectImportServerMapState.get('importType', importType),
    );

    const resolveArgs = {
      mapName: nextProjectImportServerMapState.get('mapName'),
      mapPath: nextProjectImportServerMapState.get('mapPath'),
      projectId,
      importType: nextProjectImportServerMapState.get('importType'),
      actions,
    };

    // resolve spt
    yield call(resolveSpt, resolveArgs);

    // resolve portal
    yield call(resolvePortal, resolveArgs);

    // resolve block
    const blocks = yield call(resolveBlock, resolveArgs);

    if (blocks) {
      const singleArray = flatten(blocks.map(block => block.blocks));
      let i = 0;

      while (singleArray.length > i) {
        const singleBlock = singleArray[i];
        yield call(resolveActive, {
          ...resolveArgs,
          fileName: normalize(singleBlock.strCode),
        });
        i += 1;
      }
    }

    yield call(changeMapStateToFinished, { actions });

    // resetStore after mutations
    apolloClient.resetStore();
  } catch (error) {
    yield call(changeMapStateToError, { actions, error });
    console.error(error); // eslint-disable-line
  } finally {
    if (yield cancelled()) {
      yield call(changeMapStateToCancelled, { actions });
    }
  }
}

export function* workerCancel({ projectId, mapName }) {
  const mainKey = `${projectId}:${mapName}`;
  if (Workers[mainKey]) {
    yield cancel(Workers[mainKey]);
    Workers[mainKey] = undefined;
  } else {
    yield call(changeMapStateToCancelled, { projectId, mapName }); // bad state caused, force change to cancelled
  }
}

export function* watchStart() {
  while (true) {
    const props = yield take(PROJECTS_IMPORTS_SERVER_MAPS_START_MAP_IMPORT);
    const { projectId, mapName } = props;
    const mainKey = `${projectId}:${mapName}`;

    Workers[mainKey] = yield fork(worker, props);
  }
}

export function* watchCancel() {
  while (true) {
    const props = yield take(PROJECTS_IMPORTS_SERVER_MAPS_CANCEL_MAP_IMPORT);
    yield call(workerCancel, props);
  }
}

export function* watchRemove() {
  while (true) {
    const props = yield take(PROJECTS_IMPORTS_SERVER_MAPS_REMOVE);
    yield call(workerCancel, props);
    yield put(props);
  }
}

/**
 * Catch import actions & start/cancel operations
 */
export default function* defaultSaga() {
  yield all([fork(watchStart), fork(watchCancel), fork(watchRemove)]);
}
