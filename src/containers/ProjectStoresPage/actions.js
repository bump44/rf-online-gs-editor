/*
 *
 * ProjectStoresPage actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_ID,
  CHANGE_FIELD_VALUE,
  CHANGE_PROJECT,
  CHANGE_FILTER_TAKE_SKIP,
  CHANGE_FILTER_SORT_BY,
  CHANGE_FILTER_SORT_WAY,
  CHANGE_FILTER_WHERE_SEARCH,
  RESET_RESULT,
  CHANGE_RESULT_TOTAL,
  CHANGE_RESULT_ITEMS,
  CONCAT_RESULT_ITEMS_FROM_JS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeFieldValue(key, value) {
  return {
    type: CHANGE_FIELD_VALUE,
    key,
    value,
  };
}

export function changeIsLoading(value) {
  return changeFieldValue('isLoading', !!value);
}

export function changeIsLoaded(value) {
  return changeFieldValue('isLoaded', !!value);
}

export function changeIsError(value) {
  return changeFieldValue('isError', !!value);
}

export function changeErrorMessage(value) {
  return changeFieldValue('errorMessage', value);
}

export function changeId(id) {
  return {
    type: CHANGE_ID,
    id,
  };
}

export function changeProject(project) {
  return {
    type: CHANGE_PROJECT,
    project,
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
