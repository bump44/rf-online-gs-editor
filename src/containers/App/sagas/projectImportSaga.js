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
  PROJECTS_IMPORTS_START_FILE_IMPORT,
  PROCESSING,
  PROJECTS_IMPORTS_CANCEL_FILE_IMPORT,
  CANCELLED,
  PROJECTS_IMPORTS_CHANGE_PROP_VALUE,
  WAITING,
  ERROR,
  FINISHED,
} from '../constants';

import {
  projectsImportsBindActionsWithFileKey,
  projectsImports,
} from '../actions';

import { makeSelectProjectsImports } from '../selectors';

import { FILES } from '../../../utils/gameFiles';

import clientItemResolve from './projectImport/clientItemResolve';
import clientStoreResolve from './projectImport/clientStoreResolve';
import serverItemResolve from './projectImport/serverItemResolve';
import apolloClient from '../../../apollo';

const Resolvers = {
  clientItemResolve,
  clientStoreResolve,
  serverItemResolve,
};

const Workers = {};

export function* changeFileStateToCancelled({ projectId, fileKey, actions }) {
  const fns =
    actions ||
    projectsImportsBindActionsWithFileKey({
      projectId,
      fileKey,
    });

  yield put(fns.changeStatus(CANCELLED));
}

export function* changeFileStateToProcessing({ projectId, fileKey, actions }) {
  const fns =
    actions ||
    projectsImportsBindActionsWithFileKey({
      projectId,
      fileKey,
    });

  yield put(fns.changeStatus(PROCESSING));
  yield put(fns.changeCountTotal(0));
  yield put(fns.changeCountCompleted(0));
  yield put(fns.changeErrorMessage(''));
}

export function* changeFileStateToError({
  projectId,
  fileKey,
  actions,
  error,
}) {
  const fns =
    actions ||
    projectsImportsBindActionsWithFileKey({
      projectId,
      fileKey,
    });

  yield put(fns.changeStatus(ERROR));
  yield put(fns.changeErrorMessage(error.message));
}

export function* changeFileStateToFinished({ projectId, fileKey, actions }) {
  const fns =
    actions ||
    projectsImportsBindActionsWithFileKey({
      projectId,
      fileKey,
    });

  yield put(fns.changeStatus(FINISHED));
}

export function* worker({ projectId, fileKey, importType }) {
  const projectsImportsState = yield select(makeSelectProjectsImports());
  const projectImportState = projectsImportsState.getIn(
    [projectId, fileKey],
    Map({}),
  );

  const actions = projectsImportsBindActionsWithFileKey({
    projectId,
    fileKey,
  });

  const fileData = FILES[fileKey];

  try {
    yield call(changeFileStateToProcessing, { actions });
    const resolver = Resolvers[fileData.resolve];

    if (!projectImportState.get('filePath')) {
      throw new Error('File path is required');
    }

    // use fallback import type
    const nextProjectImportState = projectImportState.set(
      'importType',
      projectImportState.get('importType', importType),
    );

    // call resolver
    yield call(resolver, {
      fileData,
      projectId,
      fileKey,
      actions,
      projectImportState: nextProjectImportState,
    });

    yield call(changeFileStateToFinished, { actions });

    // resetStore after mutations
    apolloClient.resetStore();
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
    const props = yield take(PROJECTS_IMPORTS_START_FILE_IMPORT);
    const { projectId, fileKey } = props;
    const mainKey = `${projectId}:${fileKey}`;

    Workers[mainKey] = yield fork(worker, props);
  }
}

export function* watchCancel() {
  while (true) {
    const props = yield take(PROJECTS_IMPORTS_CANCEL_FILE_IMPORT);
    yield call(workerCancel, props);
  }
}

export function* watchChangeProp() {
  while (true) {
    const props = yield take(PROJECTS_IMPORTS_CHANGE_PROP_VALUE);

    if (props.propKey === 'filePath') {
      // force cancel
      yield call(workerCancel, props);

      // change status
      yield put(
        projectsImports.changeStatus({
          ...props,
          propValue: WAITING,
        }),
      );
    }
  }
}

/**
 * Catch import actions & start/cancel operations
 */
export default function* defaultSaga() {
  yield all([fork(watchStart), fork(watchCancel), fork(watchChangeProp)]);
}
