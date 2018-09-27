/*
 *
 * ProjectStorePage actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_PROJECT,
  CHANGE_ID,
  CHANGE_FIELD_VALUE,
  CHANGE_PROJECT_STORE,
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

export function changeId(id, storeId) {
  return {
    type: CHANGE_ID,
    id,
    storeId,
  };
}

export function changeProject(project) {
  return {
    type: CHANGE_PROJECT,
    project,
  };
}

export function changeProjectStore(projectStore) {
  return {
    type: CHANGE_PROJECT_STORE,
    projectStore,
  };
}
