import { all, take, call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'react-router-redux';
import apolloClient from '~/apollo';
import CreateMutation from '~/apollo/mutations/project_create';

import { changeIsLoading, changeIsError, changeErrorMessage } from './actions';
import { SUBMIT } from './constants';
import makeSelectProjectCreatePage from './selectors';

// Individual exports for testing
export function* submit() {
  const projectCreatePage = yield select(makeSelectProjectCreatePage());

  yield put(changeIsLoading(true));
  yield put(changeIsError(false));
  yield put(changeErrorMessage(''));

  try {
    yield delay(300);

    const result = yield call(apolloClient.mutate, {
      mutation: CreateMutation,
      variables: {
        title: projectCreatePage.title,
        description: projectCreatePage.description,
        isPublic: projectCreatePage.isPublic,
      },
    });

    const { id /* title */ } = result.data.projectCreate;

    // redirect to project page
    yield put(changeIsLoading(false));
    yield put(push(`/project/${id}`));
  } catch (err) {
    yield put(changeIsError(true));
    yield put(
      changeErrorMessage(err.message.replace('GraphQL error:', '').trim()),
    );
    yield put(changeIsLoading(false));
  }
}

export function* watchSubmit() {
  while (true) {
    const props = yield take(SUBMIT);
    yield call(submit, props);
  }
}

export default function* defaultSaga() {
  yield all([call(watchSubmit)]);
}
