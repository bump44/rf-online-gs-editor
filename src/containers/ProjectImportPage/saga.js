import { take, call, put, all, fork, select } from 'redux-saga/effects';
import { CHANGE_ID } from './constants';
import { ANNOUNCE_PROJECT_COUNT_ITEMS } from '../App/constants';
import apolloClient from '../../apollo';
import projectQuery from '../../apollo/queries/project';
import {
  changeErrorMessage,
  changeIsError,
  changeIsLoaded,
  changeIsLoading,
  changeProject,
  changeFieldValue,
} from './actions';
import { makeSelectProject } from './selectors';

// Individual exports for testing
export function* changeId({ id }) {
  yield put(changeErrorMessage(''));
  yield put(changeIsError(false));
  yield put(changeIsLoaded(false));
  yield put(changeIsLoading(true));

  try {
    const result = yield call(apolloClient.query, {
      query: projectQuery,
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

export function* watchAnnounceCountItems() {
  while (true) {
    const props = yield take(ANNOUNCE_PROJECT_COUNT_ITEMS);
    const project = yield select(makeSelectProject());
    if (project && project.get('id') === props.id) {
      yield put(
        changeFieldValue(
          'project',
          project.setIn(['items', 'total'], props.count),
        ),
      );
    }
  }
}

export default function* defaultSaga() {
  yield all([fork(watchChangeId), fork(watchAnnounceCountItems)]);
  // See example in containers/HomePage/saga.js
}
