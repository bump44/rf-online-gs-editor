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

const WorkersSave = {};

export const Resolvers = {
  name: (item, nextValue) => {
    let nextMap = item;
    PROJECT_ITEM_NAME_FIELDS.forEach(nameField => {
      nextMap = nextMap.setIn(nameField, nextValue);
    });
    return nextMap;
  },
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
  yield delay(3000); // delay before start mutation
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
    yield delay(5000); // TODO: mutate
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
