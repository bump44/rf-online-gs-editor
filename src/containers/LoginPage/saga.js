import { all, take, call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import apolloClient from '~/apollo';
import userLoginMutation from '~/apollo/mutations/user_login';

import {
  changeCurrentUser,
  changeCurrentUserToken,
} from '~/containers/App/actions';

import { SUBMIT } from './constants';
import { changeIsLoading, changeIsError, changeErrorMessage } from './actions';
import makeSelectLoginPage from './selectors';

// Individual exports for testing
export function* submit() {
  const loginPage = yield select(makeSelectLoginPage());

  yield put(changeIsLoading(true));
  yield put(changeIsError(false));
  yield put(changeErrorMessage(''));

  try {
    yield delay(300);

    const result = yield call(apolloClient.mutate, {
      mutation: userLoginMutation,
      variables: {
        ident: loginPage.ident,
        password: loginPage.password,
      },
    });

    const { token, user } = result.data.userLogin;

    // dispatch to global
    yield put(changeIsLoading(false));
    yield put(changeCurrentUserToken(token));
    yield put(changeCurrentUser(user));
  } catch (err) {
    yield put(changeIsError(true));
    yield put(changeErrorMessage(err.message));
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
