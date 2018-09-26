/*
 *
 * ProjectStoresPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_ID,
  DEFAULT_ACTION,
  CHANGE_FIELD_VALUE,
  CHANGE_PROJECT,
  CHANGE_FILTER_WHERE_SEARCH,
  CHANGE_FILTER_SORT_WAY,
  CHANGE_FILTER_SORT_BY,
  CHANGE_FILTER_TAKE_SKIP,
  RESET_RESULT,
  CHANGE_RESULT_ITEMS,
  CONCAT_RESULT_ITEMS_FROM_JS,
  CHANGE_RESULT_TOTAL,
} from './constants';

import {
  ANNOUNCE_PROJECT_COUNT_ITEMS,
  ANNOUNCE_PROJECT_COUNT_STORES,
} from '../App/constants';

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

function projectStoresPageReducer(state = initialState, action) {
  switch (action.type) {
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
    case CHANGE_ID:
      return state
        .set('id', action.id)
        .set('project', null)
        .set('isLoaded', false);
    case CHANGE_FIELD_VALUE:
      return state.set(action.key, action.value);
    case CHANGE_PROJECT:
      return state.set('project', fromJS(action.project));
    case DEFAULT_ACTION:
      return state;
    case ANNOUNCE_PROJECT_COUNT_ITEMS:
      return state.set(
        'project',
        state.getIn(['project', 'id']) === action.id
          ? state.get('project').setIn(['items', 'total'], action.count)
          : state.get('project'),
      );
    case ANNOUNCE_PROJECT_COUNT_STORES:
      return state.set(
        'project',
        state.getIn(['project', 'id']) === action.id
          ? state.get('project').setIn(['stores', 'total'], action.count)
          : state.get('project'),
      );
    default:
      return state;
  }
}

export default projectStoresPageReducer;
