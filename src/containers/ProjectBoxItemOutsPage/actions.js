/*
 *
 * ProjectBoxItemOutsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  RESET_RESULT,
  CONCAT_RESULT_ITEMS_FROM_JS,
  CHANGE_RESULT_ITEMS,
  CHANGE_RESULT_TOTAL,
  CHANGE_FILTER_TAKE_SKIP,
  CHANGE_FILTER_SORT_BY,
  CHANGE_FILTER_SORT_WAY,
  CHANGE_FILTER_WHERE_SEARCH,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeFilterTakeSkip(take, skip) {
  return {
    type: CHANGE_FILTER_TAKE_SKIP,
    take,
    skip,
  };
}

export function changeFilterSortBy(sortBy) {
  return {
    type: CHANGE_FILTER_SORT_BY,
    sortBy,
  };
}

export function changeFilterSortWay(sortWay) {
  return {
    type: CHANGE_FILTER_SORT_WAY,
    sortWay,
  };
}

export function changeFilterWhereSearch(search) {
  return {
    type: CHANGE_FILTER_WHERE_SEARCH,
    search,
  };
}

export function changeResultTotal(total) {
  return {
    type: CHANGE_RESULT_TOTAL,
    total,
  };
}

export function changeResultItems(items) {
  return {
    type: CHANGE_RESULT_ITEMS,
    items,
  };
}

export function concatResultItemsFromJs(items) {
  return {
    type: CONCAT_RESULT_ITEMS_FROM_JS,
    items,
  };
}

export function resetResult() {
  return { type: RESET_RESULT };
}
