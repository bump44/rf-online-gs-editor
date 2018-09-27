import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the projectStorePage state domain
 */

const selectProjectStorePageDomain = state =>
  state.get('projectStorePage', initialState);

/**
 * Other specific selectors
 */
const makeSelectProject = () =>
  createSelector(selectProjectStorePageDomain, substate =>
    substate.get('project'),
  );

const makeSelectProjectStore = () =>
  createSelector(selectProjectStorePageDomain, substate =>
    substate.get('projectStore'),
  );

const makeSelectId = () =>
  createSelector(selectProjectStorePageDomain, substate => substate.get('id'));

const makeSelectStoreId = () =>
  createSelector(selectProjectStorePageDomain, substate =>
    substate.get('storeId'),
  );

/**
 * Default selector used by ProjectStorePage
 */

const makeSelectProjectStorePage = () =>
  createSelector(selectProjectStorePageDomain, substate => substate.toJS());

export default makeSelectProjectStorePage;
export {
  selectProjectStorePageDomain,
  makeSelectProject,
  makeSelectProjectStore,
  makeSelectId,
  makeSelectStoreId,
};
