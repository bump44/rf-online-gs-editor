/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
import { Map, List, fromJS } from 'immutable';

export const CHANGE_CURRENT_USER = 'global/CHANGE_CURRENT_USER';
export const CHANGE_CURRENT_USER_TOKEN = 'global/CHANGE_CURRENT_USER_TOKEN';
export const LOGOUT_CURRENT_USER = 'global/LOGOUT_CURRENT_USER';

// Projects Imports
export const PROJECTS_IMPORTS_CHANGE_PROP_VALUE =
  'global/PROJECTS_IMPORTS_CHANGE_PROP_VALUE';
export const PROJECTS_IMPORTS_START_FILE_IMPORT =
  'global/PROJECTS_IMPORTS_START_FILE_IMPORT';
export const PROJECTS_IMPORTS_CANCEL_FILE_IMPORT =
  'global/PROJECTS_IMPORTS_CANCEL_FILE_IMPORT';

// Projects Exports
export const PROJECTS_EXPORTS_CHANGE_PROP_VALUE =
  'global/PROJECTS_EXPORTS_CHANGE_PROP_VALUE';
export const PROJECTS_EXPORTS_START_FILE_EXPORT =
  'global/PROJECTS_EXPORTS_START_FILE_EXPORT';
export const PROJECTS_EXPORTS_CANCEL_FILE_EXPORT =
  'global/PROJECTS_EXPORTS_CANCEL_FILE_EXPORT';

// Projects NextValues
export const PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE =
  'global/PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE';
export const PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE =
  'global/PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE';
export const PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE_ONLY_IN_STATE =
  'global/PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE_ONLY_IN_STATE';
export const PROJECTS_NEXT_VALUES_CHANGE_IS_SAVING =
  'global/PROJECTS_NEXT_VALUES_CHANGE_IS_SAVING';
export const PROJECTS_NEXT_VALUES_CHANGE_IS_SAVED =
  'global/PROJECTS_NEXT_VALUES_CHANGE_IS_SAVED';
export const PROJECTS_NEXT_VALUES_CHANGE_IS_REMOVING =
  'global/PROJECTS_NEXT_VALUES_CHANGE_IS_REMOVING';
export const PROJECTS_NEXT_VALUES_CHANGE_IS_RESTORING =
  'global/PROJECTS_NEXT_VALUES_CHANGE_IS_RESTORING';
export const PROJECTS_NEXT_VALUES_CHANGE_IS_ERROR =
  'global/PROJECTS_NEXT_VALUES_CHANGE_IS_ERROR';
export const PROJECTS_NEXT_VALUES_CHANGE_IS_COPYING =
  'global/PROJECTS_NEXT_VALUES_CHANGE_IS_COPYING';
export const PROJECTS_NEXT_VALUES_CHANGE_ERROR_MESSAGE =
  'global/PROJECTS_NEXT_VALUES_CHANGE_ERROR_MESSAGE';
export const PROJECTS_NEXT_VALUES_REMOVE_VIRTUAL =
  'global/PROJECTS_NEXT_VALUES_REMOVE_VIRTUAL';
export const PROJECTS_NEXT_VALUES_RESTORE_VIRTUAL =
  'global/PROJECTS_NEXT_VALUES_RESTORE_VIRTUAL';

// Projects EntriesFinder
export const PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_TYPE =
  'global/PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_TYPE';
export const PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_SEARCH =
  'global/PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_SEARCH';
export const PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_BY =
  'global/PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_BY';
export const PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_WAY =
  'global/PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_WAY';
export const PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_TAKE_SKIP =
  'global/PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_TAKE_SKIP';
export const PROJECTS_ENTRIES_FINDER_RESET_RESULT =
  'global/PROJECTS_ENTRIES_FINDER_RESET_RESULT';
export const PROJECTS_ENTRIES_FINDER_CHANGE_RESULT_ITEMS =
  'global/PROJECTS_ENTRIES_FINDER_CHANGE_RESULT_ITEMS';
export const PROJECTS_ENTRIES_FINDER_CHANGE_RESULT_TOTAL =
  'global/PROJECTS_ENTRIES_FINDER_CHANGE_RESULT_TOTAL';
export const PROJECTS_ENTRIES_FINDER_CHANGE_IS_LOADING =
  'global/PROJECTS_ENTRIES_FINDER_CHANGE_IS_LOADING';
export const PROJECTS_ENTRIES_FINDER_CHANGE_IS_LOADED =
  'global/PROJECTS_ENTRIES_FINDER_CHANGE_IS_LOADED';
export const PROJECTS_ENTRIES_FINDER_CHANGE_IS_ERROR =
  'global/PROJECTS_ENTRIES_FINDER_CHANGE_IS_ERROR';
export const PROJECTS_ENTRIES_FINDER_CHANGE_ERROR_MESSAGE =
  'global/PROJECTS_ENTRIES_FINDER_CHANGE_ERROR_MESSAGE';

// Action SubTypes
export const ITEM = 'ITEM';
export const STORE = 'STORE';
export const BOXITEMOUT = 'BOXITEMOUT';

// Immutable BaseObjects
export const IMMUTABLE_MAP = Map({});
export const IMMUTABLE_LIST = List([]);

// Projects EntriesFinder Defaults
export const PROJECTS_ENTRIES_FINDER_STATE_DEFAULTS = {
  [ITEM]: fromJS({
    subType: ITEM,
    isLoading: false,
    isLoaded: false,
    isError: false,
    errorMessage: '',
    filter: {
      take: 25,
      skip: 0,
      sortBy: 'nIndex',
      sortWay: 1,
      where: { search: '', type: '' },
    },
    result: { total: 1, items: [] },
  }),
  [STORE]: fromJS({
    subType: STORE,
    isLoading: false,
    isLoaded: false,
    isError: false,
    errorMessage: '',
    filter: {
      take: 25,
      skip: 0,
      sortBy: 'nIndex',
      sortWay: 1,
      where: { search: '' },
    },
    result: { total: 1, items: [] },
  }),
};

// Action States Constants
export const SKIP = 'skip';
export const REPLACE = 'replace';
export const WAITING = 'waiting';
export const PROCESSING = 'processing';
export const FINISHED = 'finished';
export const ERROR = 'error';
export const CANCELLED = 'cancelled';
export const LOADING = 'loading';

// Announces
export const ANNOUNCE_PROJECT_COUNT_ITEMS =
  'ANNOUNCE(s)/ANNOUNCE_PROJECT_COUNT_ITEMS';
export const ANNOUNCE_PROJECT_COUNT_STORES =
  'ANNOUNCE(s)/ANNOUNCE_PROJECT_COUNT_STORES';
export const ANNOUNCE_PROJECT_COUNT_BOXITEMOUTS =
  'ANNOUNCE(s)/ANNOUNCE_PROJECT_COUNT_BOXITEMOUTS';

// ProjectItem Name Fields (Ordered by priority)
export const PROJECT_ITEM_NAME_FIELDS = [
  ['priorStrName'],
  ['client', 'strName'],
  ['clientND', 'strName'],
  ['server', 'strName'],
];

// LocalSettings
export const AUTO_REVERSE_CLIENT_CODES = 'AUTO_REVERSE_CLIENT_CODES';
export const DISABLE_RENDER_ITEMS_IS_SCROLLING =
  'DISABLE_RENDER_ITEMS_IS_SCROLLING';
export const DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE =
  'DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE';
export const AUTO_RECALC_STORAGE_PRICE_IF_MONEY_VALUE_CHANGED =
  'AUTO_RECALC_STORAGE_PRICE_IF_MONEY_VALUE_CHANGED';
export const DEFAULT_STORAGE_PRICE_PERCENT = 'DEFAULT_STORAGE_PRICE_PERCENT';
