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
  PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE,
  ITEM,
  STORE,
} from '../constants';

import {
  projectsNextValuesChangeNextValue,
  projectsNextValuesChangeIsSaving,
  projectsNextValuesChangeIsError,
  projectsNextValuesChangeIsSaved,
  projectsNextValuesChangeErrorMessage,
} from '../actions';

import {
  makeSelectProjectsNextValues,
  makeSelectLocalSettings,
} from '../selectors';

import apolloClient from '../../../apollo';

import projectItemUpdate from '../../../apollo/mutations/project_item_update';
import projectStoreUpdate from '../../../apollo/mutations/project_store_update';

import itemResolvers from './projectNextValue/itemResolvers';
import storeResolvers from './projectNextValue/storeResolvers';

const WorkersSave = {};

export const Resolvers = {
  [ITEM]: itemResolvers,
  [STORE]: storeResolvers,
};

export const MutationUpdateQueries = {
  [ITEM]: projectItemUpdate,
  [STORE]: projectStoreUpdate,
};

export function* changeProp({
  projectId,
  propKey,
  propValue,
  subType,
  ...props
}) {
  const item = props.item instanceof Map ? props.item : Map(props.item);
  const projectsNextValues = yield select(makeSelectProjectsNextValues());
  const localSettings = yield select(makeSelectLocalSettings());

  try {
    const projectNextValue = projectsNextValues
      .getIn([projectId, item.get('id')])
      .get('nextValue');

    const typeResolvers = Resolvers[subType];

    if (!typeResolvers) {
      throw new Error('Value resolvers not defined');
    }

    const resolver = typeResolvers[propKey] || (() => projectNextValue);
    const nextMap = resolver(projectNextValue, propValue, {
      localSettings,
      item,
      ...props.additionalData,
    });

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
          subType,
        },
        nextMap,
      ),
    );
  } catch (err) {
    console.error(err); // eslint-disable-line
    yield put(
      projectsNextValuesChangeIsError(
        {
          projectId,
          keyId: item.get('id'),
        },
        true,
      ),
    );

    yield put(
      projectsNextValuesChangeErrorMessage(
        {
          projectId,
          keyId: item.get('id'),
        },
        err.message,
      ),
    );
  }
}

export function* workerSave({ projectId, keyId, subType }) {
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

    const typeMutation = MutationUpdateQueries[subType];

    if (!typeMutation) {
      throw new Error('Value mutation not defined');
    }

    // mutate server state
    yield apolloClient.mutate({
      mutation: typeMutation,
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
