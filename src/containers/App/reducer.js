import { fromJS } from 'immutable';
import {
  CHANGE_CURRENT_USER,
  CHANGE_CURRENT_USER_TOKEN,
  LOGOUT_CURRENT_USER,
  PROJECTS_IMPORTS_CHANGE_PROP_VALUE,
} from './constants';
import { saveTokenMe } from '../../utils/ls';

// The initial state of the App
const initialState = fromJS({
  isLoggedIn: false,
  currentUser: null,
  currentUserToken: '',

  /**
   * Projects Imports Operations
   * {
   *  [project.id]: {
   *    [fileKey]: {
   *      filePath: 'C:/...',
   *      status: WAITING/PROCESSING/FINISHED/ERROR/CANCELLED,
   *      errorMessage: '',
   *      projectId: '',
   *      fileKey: '',
   *      countTotal: 0,
   *      countCompleted: 0,
   *      importType: SKIP/REPLACE,
   *    }
   *  }
   */
  projectsImports: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECTS_IMPORTS_CHANGE_PROP_VALUE:
      return state
        .setIn(
          ['projectsImports', action.projectId, action.fileKey, action.propKey],
          action.propValue,
        )
        .setIn(
          ['projectsImports', action.projectId, action.fileKey, 'projectId'],
          action.projectId,
        )
        .setIn(
          ['projectsImports', action.projectId, action.fileKey, 'fileKey'],
          action.fileKey,
        );
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
