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
const makeSelectProject = () =>
  createSelector(selectProjectItemPageDomain, substate =>
    substate.get('project'),
  );

const makeSelectProjectItem = () =>
  createSelector(selectProjectItemPageDomain, substate =>
    substate.get('projectItem'),
  );

const makeSelectId = () =>
  createSelector(selectProjectItemPageDomain, substate => substate.get('id'));

const makeSelectItemId = () =>
  createSelector(selectProjectItemPageDomain, substate =>
    substate.get('itemId'),
  );

/**
 * Default selector used by ProjectItemPage
 */

const makeSelectProjectItemPage = () =>
  createSelector(selectProjectItemPageDomain, substate => substate.toJS());

export default makeSelectProjectItemPage;
export {
  selectProjectItemPageDomain,
  makeSelectProject,
  makeSelectProjectItem,
  makeSelectId,
  makeSelectItemId,
};
