import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the projectCreatePage state domain
 */

const selectProjectCreatePageDomain = state =>
  state.get('projectCreatePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProjectCreatePage
 */

const makeSelectProjectCreatePage = () =>
  createSelector(
    selectProjectCreatePageDomain,
    substate => substate.toJS(),
  );

export default makeSelectProjectCreatePage;
export { selectProjectCreatePageDomain };
