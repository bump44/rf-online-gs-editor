import { fromJS } from 'immutable';
import { saveTokenMe } from 'utils/ls';

import {
  CHANGE_CURRENT_USER,
  CHANGE_CURRENT_USER_TOKEN,
  LOGOUT_CURRENT_USER,
  PROJECTS_IMPORTS_CHANGE_PROP_VALUE,
  PROJECTS_EXPORTS_CHANGE_PROP_VALUE,
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
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_TYPE,
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_SEARCH,
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_BY,
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_WAY,
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_TAKE_SKIP,
  PROJECTS_ENTRIES_FINDER_CHANGE_RESULT_ITEMS,
  PROJECTS_ENTRIES_FINDER_CHANGE_RESULT_TOTAL,
  PROJECTS_ENTRIES_FINDER_RESET_RESULT,
  PROJECTS_ENTRIES_FINDER_STATE_DEFAULTS,
  PROJECTS_ENTRIES_FINDER_CHANGE_IS_LOADING,
  PROJECTS_ENTRIES_FINDER_CHANGE_ERROR_MESSAGE,
  PROJECTS_ENTRIES_FINDER_CHANGE_IS_ERROR,
  PROJECTS_ENTRIES_FINDER_CHANGE_IS_LOADED,
  IMMUTABLE_MAP,
  PROJECTS_NEXT_VALUES_REMOVE_VIRTUAL,
  PROJECTS_NEXT_VALUES_CHANGE_IS_REMOVING,
  PROJECTS_NEXT_VALUES_CHANGE_IS_COPYING,
  PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE_ONLY_IN_STATE,
  PROJECTS_NEXT_VALUES_CHANGE_IS_RESTORING,
  PROJECTS_IMPORTS_SERVER_MAPS_CHANGE_PROP_VALUE,
  PROJECTS_IMPORTS_SERVER_MAPS_REMOVE,
} from './constants';

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
   * Projects ImportsServerMaps Operations
   * {
   *  [project.id]: {
   *    [mapName]: {
   *      mapPath: 'C:/...',
   *      status: WAITING/PROCESSING/FINISHED/ERROR/CANCELLED,
   *      errorMessage: '',
   *      projectId: '',
   *      mapName: '',
   *      countTotal: 0,
   *      countCompleted: 0,
   *      importType: SKIP/REPLACE,
   *    }
   *  }
   */
  projectsImportsServerMaps: {},

  /**
   * Projects Exports Operations
   * {
   *  [project.id]: {
   *    [fileKey]: {
   *      fileKey: '',
   *      status: WAITING/PROCESSING/FINISHED/ERROR/CANCELLED,
   *      errorMessage: '',
   *      message: '',
   *      loaded: 0,
   *      total: 0,
   *    }
   *  }
   * }
   */
  projectsExports: {},

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
   *      isCopying: false,
   *      isRemoving: false,
   *      isRestoring: false,
   *      errorMessage: '',
   *      nextValue: {},
   *    }
   *  }
   * }
   */
  projectsNextValues: {},

  /**
   * Projects Entries Find State
   *
   * {
   *  [project.id]: {
   *    [subType:[STORE, ITEM]]: {
   *      subType: '',
   *      isLoading: false,
   *      isLoaded: false,
   *      isError: false,
   *      errorMessage: '',
   *      filter: {}, // subType filter
   *      result: { total: 0, items: [] },
   *    }
   *  }
   * }
   */
  projectsEntriesFinder: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    // PROJECTS_ENTRIES_FINDER
    case PROJECTS_ENTRIES_FINDER_CHANGE_IS_LOADING:
      return state.setIn(
        [
          'projectsEntriesFinder',
          action.projectId,
          action.subType,
          'isLoading',
        ],
        action.isLoading,
      );
    case PROJECTS_ENTRIES_FINDER_CHANGE_IS_LOADED:
      return state.setIn(
        ['projectsEntriesFinder', action.projectId, action.subType, 'isLoaded'],
        action.isLoaded,
      );
    case PROJECTS_ENTRIES_FINDER_CHANGE_IS_ERROR:
      return state.setIn(
        ['projectsEntriesFinder', action.projectId, action.subType, 'isError'],
        action.isError,
      );
    case PROJECTS_ENTRIES_FINDER_CHANGE_ERROR_MESSAGE:
      return state.setIn(
        [
          'projectsEntriesFinder',
          action.projectId,
          action.subType,
          'errorMessage',
        ],
        action.errorMessage,
      );
    case PROJECTS_ENTRIES_FINDER_CHANGE_RESULT_ITEMS:
      return state.setIn(
        [
          'projectsEntriesFinder',
          action.projectId,
          action.subType,
          'result',
          'items',
        ],
        action.items,
      );
    case PROJECTS_ENTRIES_FINDER_CHANGE_RESULT_TOTAL:
      return state.setIn(
        [
          'projectsEntriesFinder',
          action.projectId,
          action.subType,
          'result',
          'total',
        ],
        action.total,
      );
    case PROJECTS_ENTRIES_FINDER_RESET_RESULT:
      return state.setIn(
        ['projectsEntriesFinder', action.projectId, action.subType, 'result'],
        PROJECTS_ENTRIES_FINDER_STATE_DEFAULTS[action.subType].get('result'),
      );
    case PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_SEARCH:
      return state.setIn(
        [
          'projectsEntriesFinder',
          action.projectId,
          action.subType,
          'filter',
          'where',
          'search',
        ],
        action.whereSearch,
      );
    case PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_TYPE:
      return state.setIn(
        [
          'projectsEntriesFinder',
          action.projectId,
          action.subType,
          'filter',
          'where',
          'type',
        ],
        action.whereType,
      );
    case PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_BY:
      return state.setIn(
        [
          'projectsEntriesFinder',
          action.projectId,
          action.subType,
          'filter',
          'sortBy',
        ],
        action.sortBy,
      );
    case PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_WAY:
      return state.setIn(
        [
          'projectsEntriesFinder',
          action.projectId,
          action.subType,
          'filter',
          'sortWay',
        ],
        action.sortWay,
      );
    case PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_TAKE_SKIP:
      return state
        .setIn(
          [
            'projectsEntriesFinder',
            action.projectId,
            action.subType,
            'filter',
            'take',
          ],
          action.take,
        )
        .setIn(
          [
            'projectsEntriesFinder',
            action.projectId,
            action.subType,
            'filter',
            'skip',
          ],
          action.skip,
        );

    // PROJECTS_NEXT_VALUES
    case PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE_ONLY_IN_STATE:
    case PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE: // this event takes in saga actions
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
    case PROJECTS_NEXT_VALUES_CHANGE_IS_REMOVING:
      return state.setIn(
        ['projectsNextValues', action.projectId, action.keyId, 'isRemoving'],
        action.isRemoving,
      );
    case PROJECTS_NEXT_VALUES_CHANGE_IS_RESTORING:
      return state.setIn(
        ['projectsNextValues', action.projectId, action.keyId, 'isRestoring'],
        action.isRestoring,
      );
    case PROJECTS_NEXT_VALUES_CHANGE_IS_COPYING:
      return state.setIn(
        ['projectsNextValues', action.projectId, action.keyId, 'isCopying'],
        action.isCopying,
      );
    case PROJECTS_NEXT_VALUES_CHANGE_ERROR_MESSAGE:
      return state.setIn(
        ['projectsNextValues', action.projectId, action.keyId, 'errorMessage'],
        action.errorMessage,
      );
    // change of values in the saga
    case PROJECTS_NEXT_VALUES_REMOVE_VIRTUAL:
      return state.setIn(
        [
          'projectsNextValues',
          action.projectId,
          action.entry.get('id'),
          'keyId',
        ],
        action.entry.get('id'),
      );
    case PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE:
      return state
        .setIn(
          [
            'projectsNextValues',
            action.projectId,
            action.entry.get('id'),
            'isSaved',
          ],
          false,
        )
        .setIn(
          [
            'projectsNextValues',
            action.projectId,
            action.entry.get('id'),
            'keyId',
          ],
          action.entry.get('id'),
        )
        .setIn(
          [
            'projectsNextValues',
            action.projectId,
            action.entry.get('id'),
            'nextValue',
          ],
          state.getIn(
            [
              'projectsNextValues',
              action.projectId,
              action.entry.get('id'),
              'nextValue',
            ],
            IMMUTABLE_MAP,
          ),
        );

    // PROJECTS_IMPORTS
    case PROJECTS_IMPORTS_CHANGE_PROP_VALUE:
      return logicProjectsImportsChangePropValue(state, action);

    // PROJECTS_IMPORTS_SERVER_MAPS
    case PROJECTS_IMPORTS_SERVER_MAPS_CHANGE_PROP_VALUE:
      return logicProjectsImportsServerMapsChangePropValue(state, action);
    case PROJECTS_IMPORTS_SERVER_MAPS_REMOVE:
      return state.removeIn([
        'projectsImportsServerMaps',
        action.projectId,
        action.mapName,
      ]);

    // PROJECTS_EXPORTS
    case PROJECTS_EXPORTS_CHANGE_PROP_VALUE:
      return state
        .setIn(
          ['projectsExports', action.projectId, action.fileKey, action.propKey],
          action.propValue,
        )
        .setIn(
          ['projectsExports', action.projectId, action.fileKey, 'projectId'],
          action.projectId,
        )
        .setIn(
          ['projectsExports', action.projectId, action.fileKey, 'fileKey'],
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

function logicProjectsImportsChangePropValue(state, action) {
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
}

function logicProjectsImportsServerMapsChangePropValue(state, action) {
  return state
    .setIn(
      [
        'projectsImportsServerMaps',
        action.projectId,
        action.mapName,
        action.propKey,
      ],
      action.propValue,
    )
    .setIn(
      [
        'projectsImportsServerMaps',
        action.projectId,
        action.mapName,
        'projectId',
      ],
      action.projectId,
    )
    .setIn(
      [
        'projectsImportsServerMaps',
        action.projectId,
        action.mapName,
        'mapName',
      ],
      action.mapName,
    );
}
