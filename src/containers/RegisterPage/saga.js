import { all, take, call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import apolloClient from 'apollo';
import userRegisterMutation from 'apollo/mutations/user_register';

import {
  changeCurrentUser,
  changeCurrentUserToken,
} from 'containers/App/actions';

import { SUBMIT } from './constants';
import { changeIsLoading, changeIsError, changeErrorMessage } from './actions';
import makeSelectRegisterPage from './selectors';

// Individual exports for testing
export function* submit() {
  const registerPage = yield select(makeSelectRegisterPage());

  yield put(changeIsLoading(true));
  yield put(changeIsError(false));
  yield put(changeErrorMessage(''));

  try {
    yield delay(300);

    const result = yield call(apolloClient.mutate, {
      mutation: userRegisterMutation,
      variables: {
        login: registerPage.login,
        email: registerPage.email,
        password: registerPage.password,
      },
    });

    const { token, user } = result.data.userRegister;

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
