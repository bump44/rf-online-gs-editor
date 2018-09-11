import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the projectImportPage state domain
 */

const selectProjectImportPageDomain = state =>
  state.get('projectImportPage', initialState);

/**
 * Other specific selectors
 */
const makeSelectProject = () =>
  createSelector(selectProjectImportPageDomain, substate =>
    substate.get('project'),
  );

/**
 * Default selector used by ProjectImportPage
 */

const makeSelectProjectImportPage = () =>
  createSelector(selectProjectImportPageDomain, substate => substate.toJS());

export default makeSelectProjectImportPage;
export { selectProjectImportPageDomain, makeSelectProject };
