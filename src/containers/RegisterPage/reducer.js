/*
 *
 * RegisterPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, CHANGE_FIELD_VALUE } from './constants';

export const initialState = fromJS({
  login: '',
  email: '',
  password: '',
  isLoading: false,
  isError: false,
  errorMessage: '',
});

function registerPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIELD_VALUE:
      return state.set(action.key, action.value);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default registerPageReducer;
