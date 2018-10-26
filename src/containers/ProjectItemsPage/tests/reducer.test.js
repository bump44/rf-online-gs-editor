import { fromJS } from 'immutable';
import projectItemsPageReducer from '../reducer';

describe('projectItemsPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectItemsPageReducer(undefined, {})).toEqual(
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
          where: { search: '', type: '' },
        },
        result: {
          items: [],
          total: 1, // first-row imitate first-load
        },
      }),
    );
  });
});
