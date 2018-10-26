import { fromJS } from 'immutable';
import registerPageReducer from '../reducer';

describe('registerPageReducer', () => {
  it('returns the initial state', () => {
    expect(registerPageReducer(undefined, {})).toEqual(
      fromJS({
        login: '',
        email: '',
        password: '',
        isLoading: false,
        isError: false,
        errorMessage: '',
      }),
    );
  });
});
