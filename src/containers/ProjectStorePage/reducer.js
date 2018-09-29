/*
 *
 * ProjectStorePage reducer
 *
 */

import { fromJS } from 'immutable';
import { announceProjectCountHandler } from '../App/actions';

import {
  DEFAULT_ACTION,
  CHANGE_ID,
  CHANGE_FIELD_VALUE,
  CHANGE_PROJECT,
  CHANGE_PROJECT_STORE,
} from './constants';

import {
  ANNOUNCE_PROJECT_COUNT_ITEMS,
  ANNOUNCE_PROJECT_COUNT_STORES,
  ANNOUNCE_PROJECT_COUNT_BOX_ITEM_OUTS,
} from '../App/constants';

export const initialState = fromJS({
  id: '',
  storeId: '',
  project: null,
  projectStore: null,
  isLoading: false,
  isLoaded: false,
  isError: false,
  errorMessage: '',
});

function projectStorePageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ID:
      return state
        .set('id', action.id)
        .set('storeId', action.storeId)
        .set('project', null)
        .set('isLoaded', false);
    case CHANGE_FIELD_VALUE:
      return state.set(action.key, action.value);
    case CHANGE_PROJECT:
      return state.set('project', fromJS(action.project));
    case CHANGE_PROJECT_STORE:
      return state.set('projectStore', fromJS(action.projectStore));
    case ANNOUNCE_PROJECT_COUNT_ITEMS:
    case ANNOUNCE_PROJECT_COUNT_STORES:
    case ANNOUNCE_PROJECT_COUNT_BOX_ITEM_OUTS:
      return state.set(
        'project',
        announceProjectCountHandler(state.get('project'), action),
      );
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default projectStorePageReducer;
