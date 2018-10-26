import { fromJS } from 'immutable';
import projectsPageReducer from '../reducer';

describe('projectsPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectsPageReducer(undefined, {})).toEqual(
      fromJS({
        isLoading: false,
        isLoaded: false,
        isError: false,
        errorMessage: '',
        result: {
          projectsMy: {
            items: [],
            total: 0,
          },
          projectsNew: {
            items: [],
            total: 0,
          },
        },
      }),
    );
  });
});
