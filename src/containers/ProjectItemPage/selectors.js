import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the projectItemPage state domain
 */

const selectProjectItemPageDomain = state =>
  state.get('projectItemPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProjectItemPage
 */

const makeSelectProjectItemPage = () =>
  createSelector(selectProjectItemPageDomain, substate => substate.toJS());

export default makeSelectProjectItemPage;
export { selectProjectItemPageDomain };
