import { Map } from 'immutable';
import {
  ANNOUNCE_PROJECT_COUNT_ITEMS,
  ANNOUNCE_PROJECT_COUNT_STORES,
  ANNOUNCE_PROJECT_COUNT_BOX_ITEM_OUTS,
} from '../constants';

/**
 * Announces Actions
 */

export function announceProjectCountItems({ count, id }) {
  return {
    type: ANNOUNCE_PROJECT_COUNT_ITEMS,
    count,
    id,
  };
}

export function announceProjectCountStores({ count, id }) {
  return {
    type: ANNOUNCE_PROJECT_COUNT_STORES,
    count,
    id,
  };
}

export function announceProjectCountBoxItemOuts({ count, id }) {
  return {
    type: ANNOUNCE_PROJECT_COUNT_BOX_ITEM_OUTS,
    count,
    id,
  };
}

export function announceProjectCountHandler(state, action = {}) {
  if (!state || !(state instanceof Map)) {
    return state;
  }

  const { type, id, count } = action;
  const isCompare = state.get('id') === id;

  if (!isCompare) {
    return state;
  }

  switch (type) {
    case ANNOUNCE_PROJECT_COUNT_BOX_ITEM_OUTS:
      return state.setIn(['boxItemOuts', 'total'], count);
    case ANNOUNCE_PROJECT_COUNT_ITEMS:
      return state.setIn(['items', 'total'], count);
    case ANNOUNCE_PROJECT_COUNT_STORES:
      return state.setIn(['stores', 'total'], count);
    default:
      return state;
  }
}
