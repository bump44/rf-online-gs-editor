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

// constants
export const SKIP = 'skip';
export const REPLACE = 'replace';
export const WAITING = 'waiting';
export const PROCESSING = 'processing';
export const FINISHED = 'finished';
export const ERROR = 'error';
export const CANCELLED = 'cancelled';

export const ANNOUNCE_PROJECT_COUNT_ITEMS =
  'ANNOUNCE(s)/ANNOUNCE_PROJECT_COUNT_ITEMS';
