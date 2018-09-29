import { fromJS } from 'immutable';
import projectBoxItemOutsPageReducer from '../reducer';

describe('projectBoxItemOutsPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectBoxItemOutsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
