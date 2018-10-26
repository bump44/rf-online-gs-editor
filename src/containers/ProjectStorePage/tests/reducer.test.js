import { fromJS } from 'immutable';
import projectStorePageReducer from '../reducer';

describe('projectStorePageReducer', () => {
  it('returns the initial state', () => {
    expect(projectStorePageReducer(undefined, {})).toEqual(
      fromJS({
        id: '',
        storeId: '',
        project: null,
        projectStore: null,
        isLoading: false,
        isLoaded: false,
        isError: false,
        errorMessage: '',
      }),
    );
  });
});
