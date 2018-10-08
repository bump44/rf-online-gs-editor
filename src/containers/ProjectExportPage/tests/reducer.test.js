import { fromJS } from 'immutable';
import projectExportPageReducer from '../reducer';

describe('projectExportPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectExportPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
