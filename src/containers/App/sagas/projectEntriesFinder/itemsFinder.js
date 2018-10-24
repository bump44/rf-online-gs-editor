import { delay } from 'redux-saga';
import { fromJS } from 'immutable';
import pick from 'lodash/pick';

import {
  take,
  put,
  all,
  fork,
  cancel,
  select,
  cancelled,
} from 'redux-saga/effects';

import apolloClient from '~/apollo';
import itemsSubQuery from '~/apollo/queries/sub/items';

import {
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_TYPE,
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_SEARCH,
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_BY,
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_WAY,
  PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_TAKE_SKIP,
  ITEM,
  PROJECTS_ENTRIES_FINDER_STATE_DEFAULTS,
  IMMUTABLE_MAP,
  IMMUTABLE_LIST,
} from '../../constants';

import {
  projectsEntriesFinder,
  projectsEntriesFinderItemsBindActions,
} from '../../actions';

import { makeSelectProjectsEntriesFinder } from '../../selectors';

export function* changeFilter(props) {
  const { projectId } = props;
  const actions = projectsEntriesFinderItemsBindActions({ projectId });

  try {
    yield put(actions.changeIsLoading(true));
    yield put(actions.changeIsError(false));
    yield put(actions.changeIsLoaded(false));
    yield put(actions.changeErrorMessage(''));

    yield delay(300);

    const projectsEntriesFinderState = yield select(
      makeSelectProjectsEntriesFinder(),
    );

    const projectEntriesFinder = projectsEntriesFinderState.getIn(
      [projectId, ITEM],
      PROJECTS_ENTRIES_FINDER_STATE_DEFAULTS[ITEM],
    );

    const projectEntriesFinderFilter = PROJECTS_ENTRIES_FINDER_STATE_DEFAULTS[
      ITEM
    ].get('filter').mergeDeep(
      projectEntriesFinder.get('filter', IMMUTABLE_MAP),
    );

    const filterJS = projectEntriesFinderFilter.toJS();

    const result = yield apolloClient.query({
      query: itemsSubQuery,
      variables: {
        ...pick(filterJS, ['take', 'skip']),
        where: {
          ...filterJS.where,
          projectId,
        },
        sort: {
          [filterJS.sortBy]: filterJS.sortWay,
        },
      },
    });

    const { items, total } = result.data.items;

    // reselect because state could change
    const projectsEntriesFinderStateAfter = yield select(
      makeSelectProjectsEntriesFinder(),
    );

    let nextItems = projectsEntriesFinderStateAfter.getIn(
      [projectId, ITEM, 'result', 'items'],
      IMMUTABLE_LIST,
    );

    items.forEach((item, index) => {
      const stateIndex = index + filterJS.skip;
      nextItems = nextItems.set(stateIndex, fromJS(item));
    });

    yield put(actions.changeResultItems(nextItems));
    yield put(actions.changeResultTotal(total));
    yield put(actions.changeIsLoaded(true));
    yield put(actions.changeIsLoading(false));
  } catch (error) {
    yield put(actions.changeIsError(true));
    yield put(actions.changeErrorMessage(error.message));
    yield put(actions.changeIsLoading(false));
    console.error('error', error); // eslint-disable-line
  } finally {
    if (yield cancelled()) {
      // ignore
    }
  }
}

export function* watchChangeFilter() {
  let task;

  const { resetResult } = projectsEntriesFinder[ITEM];

  while (true) {
    const props = yield take([
      PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_TYPE,
      PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_SEARCH,
      PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_BY,
      PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_WAY,
      PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_TAKE_SKIP,
    ]);

    if (props.subType !== ITEM) {
      continue; // eslint-disable-line
    }

    // reset result state if the order of the elements changes
    if (
      [
        PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_BY,
        PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_SORT_WAY,
        PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_SEARCH,
        PROJECTS_ENTRIES_FINDER_CHANGE_FILTER_WHERE_TYPE,
      ].indexOf(props.type) !== -1
    ) {
      yield put({
        ...resetResult(),
        projectId: props.projectId,
      });
    }

    if (task) {
      yield cancel(task);
      task = undefined;
    }

    task = yield fork(changeFilter, props);
  }
}

export default function* defaultSaga() {
  yield all([fork(watchChangeFilter)]);
}
