import { fromJS } from 'immutable';
import projectsPageReducer from '../reducer';

describe('projectsPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
