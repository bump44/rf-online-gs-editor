import { fromJS } from 'immutable';
import projectBoxItemOutsPageReducer from '../reducer';

describe('projectBoxItemOutsPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectBoxItemOutsPageReducer(undefined, {})).toEqual(
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
