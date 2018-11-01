import loginPageReducer from '../reducer';
import { DEFAULT_ACTION, CHANGE_FIELD_VALUE } from '../constants';

describe('loginPageReducer', () => {
  it('returns the initial state', () => {
    expect(loginPageReducer(undefined, {})).toMatchSnapshot();
  });
  it('should mutate by action type DEFAULT_ACTION', () => {
    expect(
      loginPageReducer(undefined, { type: DEFAULT_ACTION }),
    ).toMatchSnapshot();
  });
  it('should mutate by action type CHANGE_FIELD_VALUE', () => {
    expect(
      loginPageReducer(undefined, {
        type: CHANGE_FIELD_VALUE,
        key: 'ident',
        value: 'test',
      }),
    ).toMatchSnapshot();
  });
});
