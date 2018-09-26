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

export const CHANGE_CURRENT_USER = 'global/CHANGE_CURRENT_USER';
export const CHANGE_CURRENT_USER_TOKEN = 'global/CHANGE_CURRENT_USER_TOKEN';
export const LOGOUT_CURRENT_USER = 'global/LOGOUT_CURRENT_USER';

export const PROJECTS_IMPORTS_CHANGE_PROP_VALUE =
  'global/PROJECTS_IMPORTS_CHANGE_PROP_VALUE';
export const PROJECTS_IMPORTS_START_FILE_IMPORT =
  'global/PROJECTS_IMPORTS_START_FILE_IMPORT';
export const PROJECTS_IMPORTS_CANCEL_FILE_IMPORT =
  'global/PROJECTS_IMPORTS_CANCEL_FILE_IMPORT';

export const PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE =
  'global/PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE';
export const PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE =
  'global/PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE';
export const PROJECTS_NEXT_VALUES_CHANGE_IS_SAVING =
  'global/PROJECTS_NEXT_VALUES_CHANGE_IS_SAVING';
export const PROJECTS_NEXT_VALUES_CHANGE_IS_SAVED =
  'global/PROJECTS_NEXT_VALUES_CHANGE_IS_SAVED';
export const PROJECTS_NEXT_VALUES_CHANGE_IS_ERROR =
  'global/PROJECTS_NEXT_VALUES_CHANGE_IS_ERROR';
export const PROJECTS_NEXT_VALUES_CHANGE_ERROR_MESSAGE =
  'global/PROJECTS_NEXT_VALUES_CHANGE_ERROR_MESSAGE';

// constants
export const ITEM = 'ITEM';
export const STORE = 'STORE';

export const SKIP = 'skip';
export const REPLACE = 'replace';
export const WAITING = 'waiting';
export const PROCESSING = 'processing';
export const FINISHED = 'finished';
export const ERROR = 'error';
export const CANCELLED = 'cancelled';

export const ANNOUNCE_PROJECT_COUNT_ITEMS =
  'ANNOUNCE(s)/ANNOUNCE_PROJECT_COUNT_ITEMS';

export const ANNOUNCE_PROJECT_COUNT_STORES =
  'ANNOUNCE(s)/ANNOUNCE_PROJECT_COUNT_STORES';

export const PROJECT_ITEM_NAME_FIELDS = [
  ['priorStrName'],
  ['client', 'strName'],
  ['clientNd', 'strName'],
  ['server', 'strName'],
  ['serverStr', 'strNameGLOBAL'],
  ['serverStr', 'strNameRU'],
  ['serverStr', 'strNameEN'],
];

// localSettings constants
export const AUTO_REVERSE_CLIENT_CODES = 'AUTO_REVERSE_CLIENT_CODES';
export const DISABLE_RENDER_ITEMS_IS_SCROLLING =
  'DISABLE_RENDER_ITEMS_IS_SCROLLING';
export const DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE =
  'DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE';
export const AUTO_RECALC_STORAGE_PRICE_IF_MONEY_VALUE_CHANGED =
  'AUTO_RECALC_STORAGE_PRICE_IF_MONEY_VALUE_CHANGED';
export const DEFAULT_STORAGE_PRICE_PERCENT = 'DEFAULT_STORAGE_PRICE_PERCENT';
