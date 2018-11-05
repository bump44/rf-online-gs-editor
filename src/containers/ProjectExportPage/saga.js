import { take, call, put, all, fork } from 'redux-saga/effects';
import apolloClient from '~/apollo';
import projectExportPageQuery from '~/apollo/queries/project_export_page';
import { projectsExportsServerMapsBindActions } from '~/containers/App/actions';
import { CHANGE_ID } from './constants';

import {
  changeErrorMessage,
  changeIsError,
  changeIsLoaded,
  changeIsLoading,
  changeProject,
} from './actions';

// Individual exports for testing
export function* changeId({ id }) {
  yield put(changeErrorMessage(''));
  yield put(changeIsError(false));
  yield put(changeIsLoaded(false));
  yield put(changeIsLoading(true));

  try {
    const result = yield call(apolloClient.query, {
      query: projectExportPageQuery,
      variables: { id },
    });

    const { project } = result.data;
    const actions = projectsExportsServerMapsBindActions({
      projectId: project.id,
    });

    let i = 0;
    while (project.mapNameTypes.items.length > i) {
      const mapNameType = project.mapNameTypes.items[i];
      const mapName = mapNameType.caseSens || mapNameType.value;
      yield put(actions.add(mapName));
      i += 1;
    }

    yield put(changeProject(project));
    yield put(changeIsLoaded(true));
  } catch (err) {
    yield put(changeIsError(true));
    yield put(changeErrorMessage(err.message));
  }

  yield put(changeIsLoading(false));
}

export function* watchChangeId() {
  while (true) {
    const props = yield take(CHANGE_ID);
    yield call(changeId, props);
  }
}

export default function* defaultSaga() {
  yield all([fork(watchChangeId)]);
  // See example in containers/HomePage/saga.js
}
