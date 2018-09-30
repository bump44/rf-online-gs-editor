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
const makeSelectProject = () =>
  createSelector(selectProjectBoxItemOutsPageDomain, substate =>
    substate.get('project'),
  );

const makeSelectResultTotal = () =>
  createSelector(selectProjectBoxItemOutsPageDomain, substate =>
    substate.getIn(['result', 'total']),
  );

const makeSelectResultItems = () =>
  createSelector(selectProjectBoxItemOutsPageDomain, substate =>
    substate.getIn(['result', 'items']),
  );

const makeSelectResult = () =>
  createSelector(selectProjectBoxItemOutsPageDomain, substate =>
    substate.get('result'),
  );

const makeSelectFilter = () =>
  createSelector(selectProjectBoxItemOutsPageDomain, substate =>
    substate.get('filter'),
  );

/**
 * Default selector used by ProjectBoxItemOutsPage
 */

const makeSelectProjectBoxItemOutsPage = () =>
  createSelector(selectProjectBoxItemOutsPageDomain, substate => substate);

export default makeSelectProjectBoxItemOutsPage;
export {
  selectProjectBoxItemOutsPageDomain,
  makeSelectProject,
  makeSelectResultTotal,
  makeSelectResultItems,
  makeSelectResult,
  makeSelectFilter,
};
