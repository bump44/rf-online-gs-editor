import { fromJS, Map } from 'immutable';
import {
  CHANGE_CURRENT_USER,
  CHANGE_CURRENT_USER_TOKEN,
  LOGOUT_CURRENT_USER,
  PROJECTS_IMPORTS_CHANGE_PROP_VALUE,
  PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE,
  PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE,
  PROJECTS_NEXT_VALUES_CHANGE_IS_SAVING,
  PROJECTS_NEXT_VALUES_CHANGE_IS_SAVED,
  PROJECTS_NEXT_VALUES_CHANGE_IS_ERROR,
  PROJECTS_NEXT_VALUES_CHANGE_ERROR_MESSAGE,
  AUTO_REVERSE_CLIENT_CODES,
  DISABLE_RENDER_ITEMS_IS_SCROLLING,
  DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE,
  AUTO_RECALC_STORAGE_PRICE_IF_MONEY_VALUE_CHANGED,
  DEFAULT_STORAGE_PRICE_PERCENT,
} from './constants';

import { saveTokenMe } from '../../utils/ls';

// The initial state of the App
export const initialState = fromJS({
  isLoggedIn: false,
  currentUser: null,
  currentUserToken: '',
  localSettings: {
    [AUTO_REVERSE_CLIENT_CODES]: true,
    [DISABLE_RENDER_ITEMS_IS_SCROLLING]: true,
    [DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE]: true,
    [AUTO_RECALC_STORAGE_PRICE_IF_MONEY_VALUE_CHANGED]: true,
    [DEFAULT_STORAGE_PRICE_PERCENT]: 3,
  },

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

  /**
   * Projects Next Values Operations
   *
   * {
   *  [project.id]: {
   *    [id]: {
   *      keyId: '',
   *      isSaved: false,
   *      isSaving: false,
   *      isError: false,
   *      errorMessage: '',
   *      nextValue: {},
   *    }
   *  }
   * }
   */
  projectsNextValues: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE:
      return state.setIn(
        ['projectsNextValues', action.projectId, action.keyId, 'nextValue'],
        action.nextValue,
      );
    case PROJECTS_NEXT_VALUES_CHANGE_IS_SAVING:
      return state.setIn(
        ['projectsNextValues', action.projectId, action.keyId, 'isSaving'],
        action.isSaving,
      );
    case PROJECTS_NEXT_VALUES_CHANGE_IS_SAVED:
      return state.setIn(
        ['projectsNextValues', action.projectId, action.keyId, 'isSaved'],
        action.isSaved,
      );
    case PROJECTS_NEXT_VALUES_CHANGE_IS_ERROR:
      return state.setIn(
        ['projectsNextValues', action.projectId, action.keyId, 'isError'],
        action.isError,
      );
    case PROJECTS_NEXT_VALUES_CHANGE_ERROR_MESSAGE:
      return state.setIn(
        ['projectsNextValues', action.projectId, action.keyId, 'errorMessage'],
        action.errorMessage,
      );
    // change of values in the saga
    case PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE:
      return state
        .setIn(
          [
            'projectsNextValues',
            action.projectId,
            action.item instanceof Map ? action.item.get('id') : action.item.id,
            'isSaved',
          ],
          false,
        )
        .setIn(
          [
            'projectsNextValues',
            action.projectId,
            action.item instanceof Map ? action.item.get('id') : action.item.id,
            'keyId',
          ],
          action.item instanceof Map ? action.item.get('id') : action.item.id,
        )
        .setIn(
          [
            'projectsNextValues',
            action.projectId,
            action.item instanceof Map ? action.item.get('id') : action.item.id,
            'nextValue',
          ],
          state.getIn(
            [
              'projectsNextValues',
              action.projectId,
              action.item instanceof Map
                ? action.item.get('id')
                : action.item.id,
              'nextValue',
            ],
            Map({}),
          ),
        );
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
