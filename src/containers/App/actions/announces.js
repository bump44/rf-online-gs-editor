import {
  ANNOUNCE_PROJECT_COUNT_ITEMS,
  ANNOUNCE_PROJECT_COUNT_STORES,
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
