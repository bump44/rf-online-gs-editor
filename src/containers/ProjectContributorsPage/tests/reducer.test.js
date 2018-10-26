import { fromJS } from 'immutable';
import projectContributorsPageReducer from '../reducer';

describe('projectContributorsPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectContributorsPageReducer(undefined, {})).toEqual(
      fromJS({
        id: '',
        project: null,
        isLoading: false,
        isLoaded: false,
        isError: false,
        errorMessage: '',
      }),
    );
  });
});
