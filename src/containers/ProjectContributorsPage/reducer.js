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

import { DEFAULT_ACTION } from './constants';

export const initialState = fromJS({});

function projectContributorsPageReducer(state = initialState, action) {
  switch (action.type) {
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
