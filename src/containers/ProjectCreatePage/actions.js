/*
 *
 * ProjectCreatePage actions
 *
 */

import { DEFAULT_ACTION, CHANGE_FIELD_VALUE, SUBMIT } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

// Export for testing
export function changeFieldValue(key, value) {
  return {
    type: CHANGE_FIELD_VALUE,
    key,
    value,
  };
}

export function changeTitle(value) {
  return changeFieldValue('title', value);
}

export function changeDescription(value) {
  return changeFieldValue('description', value);
}

export function changeIsPublic(value) {
  return changeFieldValue('isPublic', !!value);
}

export function changeIsLoading(value) {
  return changeFieldValue('isLoading', !!value);
}

export function changeIsError(value) {
  return changeFieldValue('isError', !!value);
}

export function changeErrorMessage(value) {
  return changeFieldValue('errorMessage', value);
}

export function submit() {
  return { type: SUBMIT };
}
