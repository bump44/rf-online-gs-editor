/*
 *
 * ProjectContributorsPage reducer
 *
 */

import { fromJS } from 'immutable';
import { announceProjectCountHandler } from '../App/actions';

import {
  ANNOUNCE_PROJECT_COUNT_ITEMS,
  ANNOUNCE_PROJECT_COUNT_STORES,
  ANNOUNCE_PROJECT_COUNT_BOX_ITEM_OUTS,
} from '../App/constants';

import {
  DEFAULT_ACTION,
  CHANGE_ID,
  CHANGE_FIELD_VALUE,
  CHANGE_PROJECT,
} from './constants';

export const initialState = fromJS({
  id: '',
  project: null,
  isLoading: false,
  isLoaded: false,
  isError: false,
  errorMessage: '',
});

function projectContributorsPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ID:
      return state
        .set('id', action.id)
        .set('project', null)
        .set('isLoaded', false);
    case CHANGE_FIELD_VALUE:
      return state.set(action.key, action.value);
    case CHANGE_PROJECT:
      return state.set('project', fromJS(action.project));
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

export default projectContributorsPageReducer;
