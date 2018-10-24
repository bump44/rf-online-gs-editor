/*
 *
 * ProjectBoxItemOutsPage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  ANNOUNCE_PROJECT_COUNT_ITEMS,
  ANNOUNCE_PROJECT_COUNT_STORES,
  ANNOUNCE_PROJECT_COUNT_BOXITEMOUTS,
} from '~/containers/App/constants';

import { announceProjectCountHandler } from '~/containers/App/actions';

import {
  DEFAULT_ACTION,
  CHANGE_FILTER_TAKE_SKIP,
  CHANGE_FILTER_SORT_BY,
  CHANGE_FILTER_SORT_WAY,
  CHANGE_FILTER_WHERE_SEARCH,
  RESET_RESULT,
  CHANGE_RESULT_TOTAL,
  CHANGE_RESULT_ITEMS,
  CONCAT_RESULT_ITEMS_FROM_JS,
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
  filter: {
    take: 25,
    skip: 0,
    sortBy: 'nIndex',
    sortWay: 1,
    where: { search: '' },
  },
  result: {
    items: [],
    total: 1, // first-row imitate first-load
  },
});

function projectBoxItemOutsPageReducer(state = initialState, action) {
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
    case CHANGE_RESULT_TOTAL:
      return state.setIn(['result', 'total'], action.total);
    case CONCAT_RESULT_ITEMS_FROM_JS:
      return state.setIn(
        ['result', 'items'],
        state.getIn(['result', 'items']).concat(fromJS(action.items)),
      );
    case CHANGE_RESULT_ITEMS:
      return state.setIn(['result', 'items'], action.items);
    case RESET_RESULT:
      return state.set('result', initialState.get('result'));
    case CHANGE_FILTER_TAKE_SKIP:
      return state
        .setIn(['filter', 'take'], action.take)
        .setIn(['filter', 'skip'], action.skip);
    case CHANGE_FILTER_SORT_BY:
      return state.setIn(['filter', 'sortBy'], action.sortBy);
    case CHANGE_FILTER_SORT_WAY:
      return state.setIn(['filter', 'sortWay'], action.sortWay);
    case CHANGE_FILTER_WHERE_SEARCH:
      return state.setIn(['filter', 'where', 'search'], action.search);
    case ANNOUNCE_PROJECT_COUNT_ITEMS:
    case ANNOUNCE_PROJECT_COUNT_STORES:
    case ANNOUNCE_PROJECT_COUNT_BOXITEMOUTS:
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

export default projectBoxItemOutsPageReducer;
