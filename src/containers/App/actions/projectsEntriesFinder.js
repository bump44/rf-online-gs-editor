import {
  ITEM,
  STORE,
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_TYPE,
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_SEARCH,
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_TAKE_SKIP,
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_BY,
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_WAY,
  PROJECTS_ENTRIES_FINDER_RESET_RESULT,
  PROJECTS_ENTRIES_FINDER_CHANGE_RESULT_ITEMS,
  PROJECTS_ENTRIES_FINDER_CHANGE_RESULT_TOTAL,
  PROJECTS_ENTRIES_FINDER_CHANGE_IS_LOADING,
  PROJECTS_ENTRIES_FINDER_CHANGE_IS_LOADED,
  PROJECTS_ENTRIES_FINDER_CHANGE_IS_ERROR,
  PROJECTS_ENTRIES_FINDER_CHANGE_ERROR_MESSAGE,
} from '../constants';

const filterActions = {
  changeIsLoading: isLoading => ({
    type: PROJECTS_ENTRIES_FINDER_CHANGE_IS_LOADING,
    isLoading,
  }),
  changeIsLoaded: isLoaded => ({
    type: PROJECTS_ENTRIES_FINDER_CHANGE_IS_LOADED,
    isLoaded,
  }),
  changeIsError: isError => ({
    type: PROJECTS_ENTRIES_FINDER_CHANGE_IS_ERROR,
    isError,
  }),
  changeErrorMessage: errorMessage => ({
    type: PROJECTS_ENTRIES_FINDER_CHANGE_ERROR_MESSAGE,
    errorMessage,
  }),
  changeFilterWhereType: whereType => ({
    type: PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_TYPE,
    whereType,
  }),
  changeFilterWhereSearch: whereSearch => ({
    type: PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_SEARCH,
    whereSearch,
  }),
  changeFilterTakeSkip: (take, skip) => ({
    type: PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_TAKE_SKIP,
    take,
    skip,
  }),
  changeFilterSortBy: sortBy => ({
    type: PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_BY,
    sortBy,
  }),
  changeFilterSortWay: sortWay => ({
    type: PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_WAY,
    sortWay,
  }),
  resetResult: () => ({ type: PROJECTS_ENTRIES_FINDER_RESET_RESULT }),
  changeResultItems: items => ({
    type: PROJECTS_ENTRIES_FINDER_CHANGE_RESULT_ITEMS,
    items,
  }),
  changeResultTotal: total => ({
    type: PROJECTS_ENTRIES_FINDER_CHANGE_RESULT_TOTAL,
    total,
  }),
};

export const projectsEntriesFinder = {
  [ITEM]: {},
  [STORE]: {},
};

function injectActions(toObject, actions = {}, params = {}) {
  Object.keys(actions).forEach(name => {
    // eslint-disable-next-line
    toObject[name] = (...args) => ({
      ...actions[name](...args),
      ...params,
    });
  });
}

function bindActions(actions) {
  return ({ projectId, dispatch = args => args }) => {
    const nextFns = {};
    Object.keys(actions).forEach(name => {
      const actionFn = actions[name];
      nextFns[name] = (...args) =>
        dispatch({
          ...actionFn(...args),
          projectId,
        });
    });
    return nextFns;
  };
}

injectActions(
  projectsEntriesFinder[ITEM],
  { ...filterActions },
  { subType: ITEM },
);

injectActions(
  projectsEntriesFinder[STORE],
  { ...filterActions },
  { subType: STORE },
);

export const projectsEntriesFinderItemsBindActions = bindActions(
  projectsEntriesFinder[ITEM],
);

export const projectsEntriesFinderStoresBindActions = bindActions(
  projectsEntriesFinder[STORE],
);
