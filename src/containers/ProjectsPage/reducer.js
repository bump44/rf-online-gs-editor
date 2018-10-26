/*
 *
 * ProjectsPage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  DEFAULT_ACTION,
  CHANGE_FIELD_VALUE,
  LOADING_SUCCESS,
} from './constants';

export const initialState = fromJS({
  isLoading: false,
  isLoaded: false,
  isError: false,
  errorMessage: '',
  result: {
    projectsMy: {
      items: [],
      total: 0,
    },
    projectsNew: {
      items: [],
      total: 0,
    },
  },
});

function projectsPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_SUCCESS:
      return state.set(
        'result',
        fromJS({
          projectsMy: action.projectsMy,
          projectsNew: action.projectsNew,
        }),
      );
    case CHANGE_FIELD_VALUE:
      return state.set(action.key, action.value);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default projectsPageReducer;
