/*
 *
 * ProjectItemsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_ID,
  CHANGE_FIELD_VALUE,
  CHANGE_PROJECT,
  CHANGE_FILTER_TAKE_SKIP,
  CHANGE_RESULT_TOTAL,
  CONCAT_RESULT_ITEMS_FROM_JS,
  RESET_RESULT,
  CHANGE_RESULT_ITEMS,
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
    sort: { nIndex: 1 },
    where: { search: '', type: 'face' },
  },
  result: {
    items: [],
    total: 0,
  },
});

function projectItemsPageReducer(state = initialState, action) {
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
    default:
      return state;
  }
}

export default projectItemsPageReducer;
