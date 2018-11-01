/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, call } from 'redux-saga/effects';
import defaultSaga, { watchSubmit } from '../saga';

const generator = defaultSaga();

describe('defaultSaga Saga', () => {
  it('should have watchSubmit', () => {
    const effect = generator.next().value;
    expect(effect).toEqual(all([call(watchSubmit)]));
  });
});
