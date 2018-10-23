import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the projectExportPage state domain
 */

const selectProjectExportPageDomain = state =>
  state.get('projectExportPage', initialState);

/**
 * Other specific selectors
 */
const makeSelectProject = () =>
  createSelector(selectProjectExportPageDomain, substate =>
    substate.get('project'),
  );

/**
 * Default selector used by ProjectExportPage
 */

const makeSelectProjectExportPage = () =>
  createSelector(selectProjectExportPageDomain, substate => substate.toJS());

export default makeSelectProjectExportPage;
export { selectProjectExportPageDomain, makeSelectProject };
