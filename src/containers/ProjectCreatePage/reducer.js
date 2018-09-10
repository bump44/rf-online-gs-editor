/*
 *
 * ProjectCreatePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, CHANGE_FIELD_VALUE } from './constants';

export const initialState = fromJS({
  title: '',
  description: '',
  isPublic: true,
  isLoading: false,
  isError: false,
  errorMessage: '',
});

function projectCreatePageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIELD_VALUE:
      return state.set(action.key, action.value);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default projectCreatePageReducer;
