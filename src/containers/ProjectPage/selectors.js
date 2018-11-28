import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the projectPage state domain
 */

const selectProjectPageDomain = state => state.get('projectPage', initialState);

/**
 * Other specific selectors
 */
const makeSelectProject = () =>
  createSelector(
    selectProjectPageDomain,
    substate => substate.get('project'),
  );

/**
 * Default selector used by ProjectPage
 */

const makeSelectProjectPage = () =>
  createSelector(
    selectProjectPageDomain,
    substate => substate.toJS(),
  );

export default makeSelectProjectPage;
export { selectProjectPageDomain, makeSelectProject };
