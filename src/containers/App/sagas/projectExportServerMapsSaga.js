import { fromJS } from 'immutable';

import {
  take,
  call,
  put,
  all,
  fork,
  cancel,
  cancelled,
} from 'redux-saga/effects';

import apolloClient from '~/apollo';
import projectWithAllTypes from '~/apollo/queries/sub/projectWithAllTypes';

import {
  PROJECTS_EXPORTS_SERVER_MAPS_START_MAP_EXPORT,
  PROJECTS_EXPORTS_SERVER_MAPS_CANCEL_MAP_EXPORT,
  CANCELLED,
  PROCESSING,
  ERROR,
  FINISHED,
  PROJECTS_EXPORTS_SERVER_MAPS_REMOVE,
} from '../constants';

import serverMapSptResolve from './projectExport/serverMapSptResolve';
import serverMapBlockResolve from './projectExport/serverMapBlockResolve';
import serverMapActiveResolve from './projectExport/serverMapActiveResolve';
import serverMapPortalResolve from './projectExport/serverMapPortalResolve';

import { projectsExportsServerMapsBindActionsWithMapName } from '../actions';
import { RELEASE_FILES_WORKDIR_FOLDER } from '~/utils/constants';
import { getReleaseFilesPath } from '~/utils/path';

const Workers = {};

export function* changeMapStateToCancelled({ projectId, mapName, actions }) {
  const fns =
    actions ||
    projectsExportsServerMapsBindActionsWithMapName({
      projectId,
      mapName,
    });

  yield put(fns.changeStatus(CANCELLED));
}

export function* changeMapStateToProcessing({ projectId, mapName, actions }) {
  const fns =
    actions ||
    projectsExportsServerMapsBindActionsWithMapName({
      projectId,
      mapName,
    });

  yield put(fns.changeStatus(PROCESSING));
  yield put(fns.changeTotal(0));
  yield put(fns.changeLoaded(0));
  yield put(fns.changeErrorMessage(''));
}

export function* changeMapStateToError({ projectId, mapName, actions, error }) {
  const fns =
    actions ||
    projectsExportsServerMapsBindActionsWithMapName({
      projectId,
      mapName,
    });

  yield put(fns.changeStatus(ERROR));
  yield put(fns.changeErrorMessage(error.message));
}

export function* changeMapStateToFinished({ projectId, mapName, actions }) {
  const fns =
    actions ||
    projectsExportsServerMapsBindActionsWithMapName({
      projectId,
      mapName,
    });

  yield put(fns.changeStatus(FINISHED));
}

export function* worker({ projectId, mapName }) {
  const actions = projectsExportsServerMapsBindActionsWithMapName({
    projectId,
    mapName,
  });

  try {
    yield call(changeMapStateToProcessing, { actions });

    const projectQuery = yield apolloClient.query({
      query: projectWithAllTypes,
      variables: { id: projectId },
    });

    const project = fromJS(projectQuery.data.project);
    const mapNameType = project
      .getIn(['mapNameTypes', 'items'])
      .find(type => type.get('caseSens') === mapName);

    if (!mapNameType) {
      throw new Error(`Unknown mapName ${mapName}`);
    }

    const resolveArgs = {
      mapNameType,
      mapName,
      projectId,
      projectDetails: project,
      actions,
      releasePath: getReleaseFilesPath(project.get('name', projectId)),
      workdirPath: getReleaseFilesPath(
        project.get('name', projectId),
        RELEASE_FILES_WORKDIR_FOLDER,
      ),
    };

    const waterfall = [
      // resolve spt
      { message: `Building ${mapName}.spt`, resolve: serverMapSptResolve },
      // resolve portal
      {
        message: `Building ${mapName}-[PORTAL].dat`,
        resolve: serverMapPortalResolve,
      },
      // resolve block
      {
        message: `Building ${mapName}-[BLOCK].dat`,
        resolve: serverMapBlockResolve,
      },
      // resolve active
      { message: `Building active blocks...`, resolve: serverMapActiveResolve },
    ];

    let wtn = 0;
    while (waterfall.length > wtn) {
      const wtt = waterfall[wtn];
      yield put(
        actions.changeMessage(
          [`${wtn + 1}/${waterfall.length}`, wtt.message].join(' '),
        ),
      );
      yield call(wtt.resolve, resolveArgs);
      wtn += 1;
    }
    yield call(changeMapStateToFinished, { actions });
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
    const props = yield take(PROJECTS_EXPORTS_SERVER_MAPS_START_MAP_EXPORT);
    const { projectId, mapName } = props;
    const mainKey = `${projectId}:${mapName}`;

    Workers[mainKey] = yield fork(worker, props);
  }
}

export function* watchCancel() {
  while (true) {
    const props = yield take(PROJECTS_EXPORTS_SERVER_MAPS_CANCEL_MAP_EXPORT);
    yield call(workerCancel, props);
  }
}

export function* watchRemove() {
  while (true) {
    const props = yield take(PROJECTS_EXPORTS_SERVER_MAPS_REMOVE);
    yield call(workerCancel, props);
    yield put(props);
  }
}

/**
 * Catch export actions & start/cancel operations
 */
export default function* defaultSaga() {
  yield all([fork(watchStart), fork(watchCancel), fork(watchRemove)]);
}
