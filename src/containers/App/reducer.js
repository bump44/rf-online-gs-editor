import { fromJS } from 'immutable';
import {
  CHANGE_CURRENT_USER,
  CHANGE_CURRENT_USER_TOKEN,
  LOGOUT_CURRENT_USER,
} from './constants';
import { saveTokenMe } from '../../utils/ls';

// The initial state of the App
const initialState = fromJS({
  isLoggedIn: false,
  currentUser: null,
  currentUserToken: '',
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CURRENT_USER:
      return state
        .set('currentUser', fromJS(action.user))
        .set('isLoggedIn', !!action.user);
    case CHANGE_CURRENT_USER_TOKEN:
      saveTokenMe(action.token);
      return state.set('currentUserToken', action.token);
    case LOGOUT_CURRENT_USER:
      saveTokenMe('');
      return state
        .set('currentUser', null)
        .set('isLoggedIn', false)
        .set('currentUserToken', '');
    default:
      return state;
  }
}

export default appReducer;
