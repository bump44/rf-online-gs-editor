import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the projectContributorsPage state domain
 */

const selectProjectContributorsPageDomain = state =>
  state.get('projectContributorsPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProjectContributorsPage
 */

const makeSelectProjectContributorsPage = () =>
  createSelector(selectProjectContributorsPageDomain, substate =>
    substate.toJS(),
  );

export default makeSelectProjectContributorsPage;
export { selectProjectContributorsPageDomain };
