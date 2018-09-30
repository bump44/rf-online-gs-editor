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
  createSelector(selectProjectBoxItemOutsPageDomain, substate =>
    substate.toJS(),
  );

export default makeSelectProjectBoxItemOutsPage;
export {
  selectProjectBoxItemOutsPageDomain,
  makeSelectResultTotal,
  makeSelectResultItems,
  makeSelectResult,
  makeSelectFilter,
};
