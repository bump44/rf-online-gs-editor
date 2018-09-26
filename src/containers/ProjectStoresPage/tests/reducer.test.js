import { fromJS } from 'immutable';
import projectStoresPageReducer from '../reducer';

describe('projectStoresPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectStoresPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
