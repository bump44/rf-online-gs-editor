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
