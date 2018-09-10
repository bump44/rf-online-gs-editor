import { fromJS } from 'immutable';
import projectImportPageReducer from '../reducer';

describe('projectImportPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectImportPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
