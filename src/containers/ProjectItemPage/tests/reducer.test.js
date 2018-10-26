import { fromJS } from 'immutable';
import projectItemPageReducer from '../reducer';

describe('projectItemPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectItemPageReducer(undefined, {})).toEqual(
      fromJS({
        id: '',
        itemId: '',
        project: null,
        projectItem: null,
        isLoading: false,
        isLoaded: false,
        isError: false,
        errorMessage: '',
      }),
    );
  });
});
