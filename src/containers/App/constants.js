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
