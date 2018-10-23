import { createSelector } from 'reselect';
import { List } from 'immutable';

import { initialState } from './reducer';

/**
 * Direct selector to the projectStoresPage state domain
 */

const selectProjectStoresPageDomain = state =>
  state.get('projectStoresPage', initialState);

/**
 * Other specific selectors
 */
const makeSelectProject = () =>
  createSelector(selectProjectStoresPageDomain, substate =>
    substate.get('project'),
  );

const makeSelectId = () =>
  createSelector(selectProjectStoresPageDomain, substate => substate.get('id'));

const makeSelectProjectMoneyTypes = () =>
  createSelector(selectProjectStoresPageDomain, substate =>
    substate.getIn(['project', 'moneyTypes', 'items'], List([])),
  );

const makeSelectProjectItemGradeTypes = () =>
  createSelector(selectProjectStoresPageDomain, substate =>
    substate.getIn(['project', 'itemGradeTypes', 'items'], List([])),
  );

const makeSelectProjectWeaponTypes = () =>
  createSelector(selectProjectStoresPageDomain, substate =>
    substate.getIn(['project', 'weaponTypes', 'items'], List([])),
  );

const makeSelectResultTotal = () =>
  createSelector(selectProjectStoresPageDomain, substate =>
    substate.getIn(['result', 'total']),
  );

const makeSelectResultItems = () =>
  createSelector(selectProjectStoresPageDomain, substate =>
    substate.getIn(['result', 'items']),
  );

const makeSelectResult = () =>
  createSelector(selectProjectStoresPageDomain, substate =>
    substate.get('result'),
  );

const makeSelectFilter = () =>
  createSelector(selectProjectStoresPageDomain, substate =>
    substate.get('filter'),
  );

/**
 * Default selector used by ProjectStoresPage
 */

const makeSelectProjectStoresPage = () =>
  createSelector(selectProjectStoresPageDomain, substate => substate.toJS());

export default makeSelectProjectStoresPage;
export {
  selectProjectStoresPageDomain,
  makeSelectProject,
  makeSelectId,
  makeSelectProjectMoneyTypes,
  makeSelectProjectItemGradeTypes,
  makeSelectProjectWeaponTypes,
  makeSelectResultTotal,
  makeSelectResultItems,
  makeSelectResult,
  makeSelectFilter,
};
