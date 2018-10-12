import { Map } from 'immutable';
import { delay } from 'redux-saga';
import { pick, omit } from 'lodash';

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
  BOXITEMOUT,
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
import boxItemOutResolvers from './projectNextValue/boxItemOutResolvers';

const Workers = {};

const Resolvers = {
  [ITEM]: itemResolvers,
  [STORE]: storeResolvers,
  [BOXITEMOUT]: boxItemOutResolvers,
};

const MutationQueries = {
  [ITEM]: projectItemUpdate,
  [STORE]: projectStoreUpdate,
};

const PickFields = {
  [STORE]: ['client', 'server'],
};

const OmitFields = {};

export function* changeProp({
  projectId,
  propKey,
  propValue,
  subType,
  ...props
}) {
  const entry = props.entry instanceof Map ? props.entry : Map(props.entry);
  const projectsNextValues = yield select(makeSelectProjectsNextValues());
  const localSettings = yield select(makeSelectLocalSettings());

  try {
    const projectNextValue = projectsNextValues
      .getIn([projectId, entry.get('id')])
      .get('nextValue');

    const typeResolvers = Resolvers[subType];

    if (!typeResolvers) {
      throw new Error('Value resolvers not defined');
    }

    const resolver = typeResolvers[propKey] || (() => projectNextValue);
    const nextMap = resolver(projectNextValue, propValue, {
      localSettings,
      entry,
      ...props.additionalData,
    });

    yield put(
      projectsNextValuesChangeIsError(
        {
          projectId,
          keyId: entry.get('id'),
        },
        false,
      ),
    );

    yield put(
      projectsNextValuesChangeNextValue(
        {
          projectId,
          keyId: entry.get('id'),
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
          keyId: entry.get('id'),
        },
        true,
      ),
    );

    yield put(
      projectsNextValuesChangeErrorMessage(
        {
          projectId,
          keyId: entry.get('id'),
        },
        err.message,
      ),
    );
  }
}

export function* worker({ projectId, keyId, subType }) {
  yield delay(1500); // delay before start mutation
  const callAction = (action, value) => action({ projectId, keyId }, value);

  try {
    const projectsNextValues = yield select(makeSelectProjectsNextValues());
    const state = projectsNextValues.getIn([projectId, keyId]);

    // exit if state empty or already saved
    if (!state || !state.get('nextValue') || state.get('isSaved')) {
      return;
    }

    yield put(callAction(projectsNextValuesChangeIsSaving, true));
    yield put(callAction(projectsNextValuesChangeIsError, false));
    yield delay(1500); // delay before mutate

    const typeMutation = MutationQueries[subType];

    if (!typeMutation) {
      throw new Error('Value mutation not defined');
    }

    const nextValueJS = state.get('nextValue').toJS();

    // mutate server state
    yield apolloClient.mutate({
      mutation: typeMutation,
      variables: {
        id: keyId,
        values: omit(
          PickFields[subType]
            ? pick(nextValueJS, PickFields[subType])
            : nextValueJS,
          OmitFields[subType] || [],
        ),
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

/**
 * Watch `PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE` action & create fork to change data in nextValue state
 */
export function* watchChangeProp() {
  while (true) {
    const props = yield take(PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE);
    yield fork(changeProp, props);
  }
}

/**
 * Watch `PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE` action & create fork to save data
 */
export function* watchChangeValue() {
  while (true) {
    const props = yield take(PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE);
    const { projectId, keyId } = props;
    const mainKey = `${projectId}:${keyId}`;

    if (Workers[mainKey]) {
      yield cancel(Workers[mainKey]);
      Workers[mainKey] = undefined;
    }

    Workers[mainKey] = yield fork(worker, props);
  }
}

export default function* defaultSaga() {
  yield all([fork(watchChangeProp), fork(watchChangeValue)]);
}
