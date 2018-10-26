import { fromJS } from 'immutable';
import projectCreatePageReducer from '../reducer';

describe('projectCreatePageReducer', () => {
  it('returns the initial state', () => {
    expect(projectCreatePageReducer(undefined, {})).toEqual(
      fromJS({
        title: '',
        description: '',
        isPublic: true,
        isLoading: false,
        isError: false,
        errorMessage: '',
      }),
    );
  });
});
