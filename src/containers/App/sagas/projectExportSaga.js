import { FILES } from '~/utils/gameFiles';
import { Map } from 'immutable';

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

import {
  PROJECTS_EXPORTS_START_FILE_EXPORT,
  PROJECTS_EXPORTS_CANCEL_FILE_EXPORT,
  PROJECTS_EXPORTS_CHANGE_PROP_VALUE,
  PROCESSING,
  CANCELLED,
  ERROR,
  FINISHED,
} from '../constants';

import { projectsExportsBindActionsWithFileKey } from '../actions';
import { makeSelectProjectsExports } from '../selectors';

import clientItemResolve from './projectExport/clientItemResolve';
import clientStoreResolve from './projectExport/clientStoreResolve';
import serverItemResolve from './projectExport/serverItemResolve';
import serverStoreResolve from './projectExport/serverStoreResolve';
import serverBoxItemOutResolve from './projectExport/serverBoxItemOutResolve';
// import clientItemNDResolve from './projectExport/clientItemNDResolve';

const Resolvers = {
  clientItemResolve,
  serverItemResolve,
  serverBoxItemOutResolve,
  serverStoreResolve,
  clientStoreResolve,
};

const Workers = {};

export function* changeFileStateToCancelled({ projectId, fileKey, actions }) {
  const fns =
    actions ||
    projectsExportsBindActionsWithFileKey({
      projectId,
      fileKey,
    });

  yield put(fns.changeStatus(CANCELLED));
}

export function* changeFileStateToProcessing({ projectId, fileKey, actions }) {
  const fns =
    actions ||
    projectsExportsBindActionsWithFileKey({
      projectId,
      fileKey,
    });

  yield put(fns.changeStatus(PROCESSING));
  yield put(fns.changeTotal(0));
  yield put(fns.changeLoaded(0));
}

export function* changeFileStateToError({
  projectId,
  fileKey,
  actions,
  error,
}) {
  const fns =
    actions ||
    projectsExportsBindActionsWithFileKey({
      projectId,
      fileKey,
    });

  yield put(fns.changeStatus(ERROR));
  yield put(fns.changeErrorMessage(error.message));
}

export function* changeFileStateToFinished({ projectId, fileKey, actions }) {
  const fns =
    actions ||
    projectsExportsBindActionsWithFileKey({
      projectId,
      fileKey,
    });

  yield put(fns.changeStatus(FINISHED));
}

export function* worker({ projectId, fileKey }) {
  const projectsExportsState = yield select(makeSelectProjectsExports());
  const projectExportState = projectsExportsState.getIn(
    [projectId, fileKey],
    Map({}),
  );

  const actions = projectsExportsBindActionsWithFileKey({
    projectId,
    fileKey,
  });

  const fileData = FILES[fileKey];

  try {
    yield call(changeFileStateToProcessing, { actions });
    const resolver = Resolvers[fileData.resolve];

    if (!resolver) {
      throw new Error('Export file resolver not defined');
    }

    // call resolver
    yield call(resolver, {
      fileData,
      projectId,
      fileKey,
      actions,
      projectExportState,
    });

    yield call(changeFileStateToFinished, { actions });
  } catch (error) {
    yield call(changeFileStateToError, { actions, error });
    console.error(error); // eslint-disable-line
  } finally {
    if (yield cancelled()) {
      yield call(changeFileStateToCancelled, { actions });
    }
  }
}

export function* workerCancel({ projectId, fileKey }) {
  const mainKey = `${projectId}:${fileKey}`;
  if (Workers[mainKey]) {
    yield cancel(Workers[mainKey]);
    Workers[mainKey] = undefined;
  } else {
    yield call(changeFileStateToCancelled, { projectId, fileKey }); // bad state caused, force change to cancelled
  }
}

export function* watchStart() {
  while (true) {
    const props = yield take(PROJECTS_EXPORTS_START_FILE_EXPORT);
    const { projectId, fileKey } = props;
    const mainKey = `${projectId}:${fileKey}`;

    Workers[mainKey] = yield fork(worker, props);
  }
}

export function* watchCancel() {
  while (true) {
    const props = yield take(PROJECTS_EXPORTS_CANCEL_FILE_EXPORT);
    yield call(workerCancel, props);
  }
}

export function* watchChangeProp() {
  while (true) {
    yield take(PROJECTS_EXPORTS_CHANGE_PROP_VALUE);
  }
}

/**
 * Catch import actions & start/cancel operations
 */
export default function* defaultSaga() {
  yield all([fork(watchStart), fork(watchCancel), fork(watchChangeProp)]);
}
