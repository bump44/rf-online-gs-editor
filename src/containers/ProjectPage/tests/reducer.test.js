import { fromJS } from 'immutable';
import projectPageReducer from '../reducer';

describe('projectPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
