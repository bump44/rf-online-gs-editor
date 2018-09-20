/*
 *
 * ProjectItemPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_ID,
  CHANGE_FIELD_VALUE,
  CHANGE_PROJECT,
  CHANGE_PROJECT_ITEM,
} from './constants';

import { ANNOUNCE_PROJECT_COUNT_ITEMS } from '../App/constants';

export const initialState = fromJS({
  id: '',
  itemId: '',
  project: null,
  projectItem: null,
  isLoading: false,
  isLoaded: false,
  isError: false,
  errorMessage: '',
});

function projectItemPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ID:
      return state
        .set('id', action.id)
        .set('itemId', action.itemId)
        .set('project', null)
        .set('isLoaded', false);
    case CHANGE_FIELD_VALUE:
      return state.set(action.key, action.value);
    case CHANGE_PROJECT:
      return state.set('project', fromJS(action.project));
    case CHANGE_PROJECT_ITEM:
      return state.set('projectItem', fromJS(action.projectItem));
    case ANNOUNCE_PROJECT_COUNT_ITEMS:
      return state.set(
        'project',
        state.getIn(['project', 'id']) === action.id
          ? state.get('project').setIn(['items', 'total'], action.count)
          : state.get('project'),
      );
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default projectItemPageReducer;
