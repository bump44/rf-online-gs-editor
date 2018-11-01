/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { delay } from 'redux-saga';
import { all, call, take, put } from 'redux-saga/effects';

import {
  submit as submitAction,
  changeIsLoading,
  changeIsError,
  changeErrorMessage,
} from '../actions';

import defaultSaga, { watchSubmit, submit } from '../saga';
import { SUBMIT } from '../constants';
import {
  changeCurrentUserToken,
  changeCurrentUser,
} from '~/containers/App/actions';

jest.mock('redux-saga');

describe('defaultSaga Saga', () => {
  it('should have watchSubmit', () => {
    const generator = defaultSaga();
    const effect = generator.next().value;
    expect(effect).toEqual(all([call(watchSubmit)]));
  });
});

describe('watchSubmit Saga', () => {
  it('should call submit after SUBMIT action', () => {
    const generator = watchSubmit();
    const props = submitAction();
    expect(generator.next().value).toEqual(take(SUBMIT));
    expect(generator.next(props).value).toEqual(call(submit, props));
  });
});

describe('submit Saga', () => {
  it('should submit change state to loading', () => {
    const generator = submit();
    expect(generator.next().value).toMatchSnapshot();
    expect(generator.next().value).toEqual(put(changeIsLoading(true)));
    expect(generator.next().value).toEqual(put(changeIsError(false)));
    expect(generator.next().value).toEqual(put(changeErrorMessage('')));
  });
  it('should be delay 300 before mutation call', () => {
    const generator = submit();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(delay(300));
  });
  it('should mutation must be ok', () => {
    const generator = submit();
    const loginPage = { ident: 'test', password: 'test' };

    generator.next();
    generator.next(loginPage);
    generator.next();
    generator.next();
    generator.next();

    // call apollo.mutate
    expect(generator.next().value).toMatchSnapshot();
    const result = {
      data: { userLogin: { token: '123', user: { login: '456' } } },
    };

    expect(generator.next(result).value).toEqual(put(changeIsLoading(false)));
    expect(generator.next().value).toEqual(
      put(changeCurrentUserToken(result.data.userLogin.token)),
    );
    expect(generator.next().value).toEqual(
      put(changeCurrentUser(result.data.userLogin.user)),
    );
  });
  it('should mutation must be fail', () => {
    const generator = submit();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    // call apollo.mutate
    expect(generator.next().value).toEqual(put(changeIsError(true)));
    expect(generator.next().value).toEqual(
      put(changeErrorMessage("Cannot read property 'ident' of undefined")),
    );
    expect(generator.next().value).toEqual(put(changeIsLoading(false)));
  });
});
