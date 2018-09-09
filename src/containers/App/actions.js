import {
  CHANGE_CURRENT_USER,
  CHANGE_CURRENT_USER_TOKEN,
  LOGOUT_CURRENT_USER,
} from './constants';

export function changeCurrentUser(user) {
  return {
    type: CHANGE_CURRENT_USER,
    user,
  };
}

export function changeCurrentUserToken(token) {
  return {
    type: CHANGE_CURRENT_USER_TOKEN,
    token,
  };
}

export function logoutCurrentUser() {
  return {
    type: LOGOUT_CURRENT_USER,
  };
}
