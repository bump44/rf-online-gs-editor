import { fork, take, call, all, put, select } from 'redux-saga/effects';
import { makeSelectIsLoggedIn } from '~/containers/App/selectors';
import apolloClient from '~/apollo';

import {
  AuthorizedQuery,
  NonAuthorizedQuery,
} from '~/apollo/queries/projects_page';

import { LOADING_START } from './constants';

import {
  changeErrorMessage,
  changeIsError,
  changeIsLoaded,
  changeIsLoading,
  loadingSuccess,
} from './actions';

// Individual exports for testing
export function* loadingStart() {
  const isLoggedIn = yield select(makeSelectIsLoggedIn());

  yield put(changeErrorMessage(''));
  yield put(changeIsError(false));
  yield put(changeIsLoaded(false));
  yield put(changeIsLoading(true));

  try {
    const result = yield call(apolloClient.query, {
      query: isLoggedIn ? AuthorizedQuery : NonAuthorizedQuery,
    });

    const projectsNew = result.data.projects;
    const projectsMy = isLoggedIn
      ? result.data.projectsMy
      : { items: [], total: 0 };

    yield put(loadingSuccess({ projectsNew, projectsMy }));
    yield put(changeIsLoaded(true));
  } catch (err) {
    yield put(changeIsError(true));
    yield put(changeErrorMessage(err.message));
  }

  yield put(changeIsLoading(false));
}

export function* watchLoadingStart() {
  while (true) {
    const props = yield take(LOADING_START);
    yield call(loadingStart, props);
  }
}

export default function* defaultSaga() {
  yield all([fork(watchLoadingStart)]);
}
