/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';

import { DEFAULT_ACTION, CHANGE_FIELD_VALUE } from './constants';

export const initialState = fromJS({
  ident: '',
  password: '',
  isLoading: false,
  isError: false,
  errorMessage: '',
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIELD_VALUE:
      return state.set(action.key, action.value);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default loginPageReducer;
