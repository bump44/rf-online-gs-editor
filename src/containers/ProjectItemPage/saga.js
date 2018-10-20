import { take, call, put, all, fork } from 'redux-saga/effects';
import { CHANGE_ID } from './constants';
import apolloClient from '../../apollo';
import projectItemPageQuery from '../../apollo/queries/project_item_page';

import {
  changeErrorMessage,
  changeIsError,
  changeIsLoaded,
  changeIsLoading,
  changeProject,
  changeProjectItem,
} from './actions';

// Individual exports for testing
export function* changeId({ id, itemId }) {
  yield put(changeErrorMessage(''));
  yield put(changeIsError(false));
  yield put(changeIsLoaded(false));
  yield put(changeIsLoading(true));

  try {
    const result = yield call(apolloClient.query, {
      query: projectItemPageQuery,
      variables: { id, itemId },
    });

    yield put(changeProject(result.data.project));
    yield put(changeProjectItem(result.data.item));
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
