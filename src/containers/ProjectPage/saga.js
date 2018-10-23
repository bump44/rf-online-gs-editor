import { take, call, put, all, fork } from 'redux-saga/effects';
import apolloClient from 'apollo';
import projectPageQuery from 'apollo/queries/project_page';

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
      query: projectPageQuery,
      variables: { id },
    });

    yield put(changeProject(result.data.project));
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
