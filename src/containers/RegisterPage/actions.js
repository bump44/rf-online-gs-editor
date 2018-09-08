/*
 *
 * RegisterPage actions
 *
 */

import { DEFAULT_ACTION, CHANGE_FIELD_VALUE } from './constants';

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

export function changeLogin(value) {
  return changeFieldValue('login', value);
}

export function changeEmail(value) {
  return changeFieldValue('email', value);
}

export function changePassword(value) {
  return changeFieldValue('password', value);
}
