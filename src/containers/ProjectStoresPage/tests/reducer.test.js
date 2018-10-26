import { fromJS } from 'immutable';
import projectStoresPageReducer from '../reducer';

describe('projectStoresPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectStoresPageReducer(undefined, {})).toEqual(
      fromJS({
        id: '',
        project: null,
        isLoading: false,
        isLoaded: false,
        isError: false,
        errorMessage: '',
        filter: {
          take: 25,
          skip: 0,
          sortBy: 'nIndex',
          sortWay: 1,
          where: { search: '' },
        },
        result: {
          items: [],
          total: 1, // first-row imitate first-load
        },
      }),
    );
  });
});
