import { fromJS } from 'immutable';
import projectItemsPageReducer from '../reducer';

describe('projectItemsPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectItemsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
