import pick from 'lodash/pick';
import { delay } from 'redux-saga';
import { fromJS } from 'immutable';

import {
  take,
  call,
  put,
  all,
  fork,
  cancel,
  cancelled,
  select,
} from 'redux-saga/effects';

import {
  CHANGE_ID,
  CHANGE_FILTER_TAKE_SKIP,
  CHANGE_FILTER_SORT_BY,
  CHANGE_FILTER_SORT_WAY,
  CHANGE_FILTER_WHERE_SEARCH,
} from './constants';

import apolloClient from '../../apollo';
import projectBoxItemOutsPageQuery from '../../apollo/queries/project_boxItemOuts_page';
import projectBoxItemOutsSubQuery from '../../apollo/queries/sub/project_boxItemOuts';

import {
  changeErrorMessage,
  changeIsError,
  changeIsLoaded,
  changeIsLoading,
  changeProject,
  resetResult,
  changeResultItems,
  changeResultTotal,
} from './actions';

import {
  makeSelectFilter,
  makeSelectResultItems,
  makeSelectId,
} from './selectors';

// Individual exports for testing
export function* changeId({ id }) {
  yield put(changeErrorMessage(''));
  yield put(changeIsError(false));
  yield put(changeIsLoaded(false));
  yield put(changeIsLoading(true));

  try {
    const result = yield call(apolloClient.query, {
      query: projectBoxItemOutsPageQuery,
      variables: { id },
    });

    yield put(changeProject(result.data.project));
    yield put(changeIsLoaded(true));
  } catch (err) {
    yield put(changeIsError(true));
    yield put(changeErrorMessage(err.message));
  }

  yield put(changeIsLoading(false));
}

export function* changeFilter() {
  try {
    yield delay(300);
    const filter = yield select(makeSelectFilter());
    const projectId = yield select(makeSelectId());
    const filterJS = filter.toJS();

    const result = yield call(apolloClient.query, {
      query: projectBoxItemOutsSubQuery,
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

    const { items, total } = result.data.projectBoxItemOuts;
    let nextItems = yield select(makeSelectResultItems());

    items.forEach((item, index) => {
      const stateIndex = index + filterJS.skip;
      nextItems = nextItems.set(stateIndex, fromJS(item));
    });

    yield put(changeResultItems(nextItems));
    yield put(changeResultTotal(total));
  } catch (error) {
    console.error('error', error); // eslint-disable-line
  } finally {
    if (yield cancelled()) {
      // ignore
    }
  }
}

export function* watchChangeId() {
  while (true) {
    const props = yield take(CHANGE_ID);
    yield call(changeId, props);
  }
}

export function* watchChangeFilter() {
  let task;

  while (true) {
    const action = yield take([
      CHANGE_FILTER_TAKE_SKIP,
      CHANGE_FILTER_SORT_BY,
      CHANGE_FILTER_SORT_WAY,
      CHANGE_FILTER_WHERE_SEARCH,
    ]);

    // reset result state if the order of the elements changes
    if (
      [
        CHANGE_FILTER_SORT_BY,
        CHANGE_FILTER_SORT_WAY,
        CHANGE_FILTER_WHERE_SEARCH,
      ].indexOf(action.type) !== -1
    ) {
      yield put(resetResult());
    }

    if (task) {
      yield cancel(task);
      task = undefined;
    }
    task = yield fork(changeFilter);
  }
}

export default function* defaultSaga() {
  yield all([fork(watchChangeId), fork(watchChangeFilter)]);
  // See example in containers/HomePage/saga.js
}
