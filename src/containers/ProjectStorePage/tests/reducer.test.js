import { fromJS } from 'immutable';
import projectStorePageReducer from '../reducer';

describe('projectStorePageReducer', () => {
  it('returns the initial state', () => {
    expect(projectStorePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
