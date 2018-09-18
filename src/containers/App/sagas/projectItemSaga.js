import { Map } from 'immutable';
import { delay } from 'redux-saga';

import {
  take,
  all,
  fork,
  put,
  select,
  cancel,
  cancelled,
} from 'redux-saga/effects';

import {
  PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE,
  PROJECT_ITEM_NAME_FIELDS,
  PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE,
} from '../constants';

import {
  projectsNextValuesChangeNextValue,
  projectsNextValuesChangeIsSaving,
  projectsNextValuesChangeIsError,
  projectsNextValuesChangeIsSaved,
  projectsNextValuesChangeErrorMessage,
} from '../actions';

import { makeSelectProjectsNextValues } from '../selectors';

import apolloClient from '../../../apollo';
import projectItemUpdate from '../../../apollo/mutations/project_item_update';

const WorkersSave = {};

export const Resolvers = {
  name: (item, nextValue) => {
    let nextMap = item;
    PROJECT_ITEM_NAME_FIELDS.forEach(nameField => {
      nextMap = nextMap.setIn(nameField, nextValue);
    });
    return nextMap;
  },
  exchange: (item, nextValue) =>
    item
      .setIn(['client', 'bExchange'], nextValue)
      .setIn(['server', 'bExchange'], nextValue),
  sell: (item, nextValue) =>
    item
      .setIn(['client', 'bSell'], nextValue)
      .setIn(['server', 'bSell'], nextValue),
  ground: (item, nextValue) =>
    item
      .setIn(['client', 'bGround'], nextValue)
      .setIn(['server', 'bGround'], nextValue),
  storagePossible: (item, nextValue) =>
    item
      .setIn(['client', 'bStoragePossible'], nextValue)
      .setIn(['server', 'bStoragePossible'], nextValue),
  money: (item, nextValue) =>
    item
      .setIn(['client', 'nMoney'], nextValue)
      .setIn(['server', 'nMoney'], nextValue),
  stdPrice: (item, nextValue) =>
    item
      .setIn(['client', 'nStdPrice'], nextValue)
      .setIn(['server', 'nStdPrice'], nextValue),
  stdPoint: (item, nextValue) =>
    item
      .setIn(['client', 'nStdPoint'], nextValue)
      .setIn(['server', 'nStdPoint'], nextValue),
  goldPoint: (item, nextValue) =>
    item
      .setIn(['client', 'nGoldPoint'], nextValue)
      .setIn(['server', 'nGoldPoint'], nextValue),
  procPoint: (item, nextValue) =>
    item
      .setIn(['client', 'nProcPoint'], nextValue)
      .setIn(['server', 'nProcPoint'], nextValue),
  killPoint: (item, nextValue) =>
    item
      .setIn(['client', 'nKillPoint'], nextValue)
      .setIn(['server', 'nKillPoint'], nextValue),
  storagePrice: (item, nextValue) =>
    item
      .setIn(['client', 'nStoragePrice'], nextValue)
      .setIn(['server', 'nStoragePrice'], nextValue),
  itemGrade: (item, nextValue) =>
    item
      .setIn(['client', 'nItemGrade'], nextValue)
      .setIn(['server', 'nItemGrade'], nextValue),
  levelLim: (item, nextValue) =>
    item
      .setIn(['client', 'nLevelLim'], nextValue)
      .setIn(['server', 'nLevelLim'], nextValue),
  upLevelLim: (item, nextValue) =>
    item
      .setIn(['client', 'nUpLevelLim'], nextValue)
      .setIn(['server', 'nUpLevelLim'], nextValue),
  defence: (item, nextValue) =>
    item
      .setIn(['server', 'nDefFc'], nextValue)
      .setIn(['server', 'fDefFc'], nextValue)
      .setIn(['client', 'nDefFc'], nextValue),
  defenceGap: (item, nextValue) =>
    item
      .setIn(['server', 'fDefGap'], nextValue)
      .setIn(['client', 'fDefGap'], nextValue),
  defenceFacing: (item, nextValue) =>
    item
      .setIn(['server', 'fDefFacing'], nextValue)
      .setIn(['client', 'fDefFacing'], nextValue),
};

export function* changeProp({ projectId, propKey, propValue, ...props }) {
  const item = props.item instanceof Map ? props.item : Map(props.item);
  const projectsNextValues = yield select(makeSelectProjectsNextValues());
  const projectNextValue = projectsNextValues
    .getIn([projectId, item.get('id')])
    .get('nextValue');

  const resolver = Resolvers[propKey] || (() => projectNextValue);
  const nextMap = resolver(projectNextValue, propValue);

  yield put(
    projectsNextValuesChangeIsError(
      {
        projectId,
        keyId: item.get('id'),
      },
      false,
    ),
  );

  yield put(
    projectsNextValuesChangeNextValue(
      {
        projectId,
        keyId: item.get('id'),
      },
      nextMap,
    ),
  );
}

export function* workerSave({ projectId, keyId }) {
  yield delay(1500); // delay before start mutation
  const callAction = (action, value) => action({ projectId, keyId }, value);

  try {
    const projectsNextValues = yield select(makeSelectProjectsNextValues());
    const state = projectsNextValues.getIn([projectId, keyId]);

    // exit if state empty or already saved
    if (!state || state.get('isSaved')) {
      return;
    }

    yield put(callAction(projectsNextValuesChangeIsSaving, true));
    yield put(callAction(projectsNextValuesChangeIsError, false));
    yield delay(1500); // delay before mutate

    // mutate server state
    yield apolloClient.mutate({
      mutation: projectItemUpdate,
      variables: {
        id: keyId,
        values: state.get('nextValue').toJS(),
      },
    });

    yield put(callAction(projectsNextValuesChangeIsSaving, false));
    yield put(callAction(projectsNextValuesChangeIsSaved, true));
  } catch (error) {
    yield put(callAction(projectsNextValuesChangeIsError, true));
    yield put(callAction(projectsNextValuesChangeErrorMessage, error.message));
    yield put(callAction(projectsNextValuesChangeIsSaving, false));
    console.error(error); // eslint-disable-line
  } finally {
    if (yield cancelled()) {
      yield put(callAction(projectsNextValuesChangeIsSaving, false));
    }
  }
}

export function* watchChangeProp() {
  while (true) {
    const props = yield take(PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE);
    yield fork(changeProp, props);
  }
}

export function* watchChangeValue() {
  while (true) {
    const props = yield take(PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE);
    const { projectId, keyId } = props;
    const mainKey = `${projectId}:${keyId}`;

    if (WorkersSave[mainKey]) {
      yield cancel(WorkersSave[mainKey]);
      WorkersSave[mainKey] = undefined;
    }

    WorkersSave[mainKey] = yield fork(workerSave, props);
  }
}

export default function* defaultSaga() {
  yield all([fork(watchChangeProp), fork(watchChangeValue)]);
}
