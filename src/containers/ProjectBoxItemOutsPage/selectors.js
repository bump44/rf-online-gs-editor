import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the projectBoxItemOutsPage state domain
 */

const selectProjectBoxItemOutsPageDomain = state =>
  state.get('projectBoxItemOutsPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProjectBoxItemOutsPage
 */

const makeSelectProjectBoxItemOutsPage = () =>
  createSelector(selectProjectBoxItemOutsPageDomain, substate =>
    substate.toJS(),
  );

export default makeSelectProjectBoxItemOutsPage;
export { selectProjectBoxItemOutsPageDomain };
