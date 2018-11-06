import { fromJS } from 'immutable';
import { put, select } from 'redux-saga/effects';

import apolloClient from '~/apollo';
import mapSptCreate from '~/apollo/mutations/mapspt_create';

import { makeSelectProjectsNextValues } from '../../selectors';
import { IMMUTABLE_MAP, IMMUTABLE_LIST } from '../../constants';
import { projectsNextValuesChangeNextValueOnlyInState } from '../../actions/projectsNextValues';

export default function* workerCreateMapSpt({
  projectId,
  keyId,
  subType,
  propValue,
  actions,
}) {
  try {
    yield actions.changeToStarted();
    const { values = {} } = propValue || {};

    const result = yield apolloClient.mutate({
      mutation: mapSptCreate,
      variables: { projectId, values },
    });

    const mapSpt = fromJS(result.data.mapSptCreate);
    const projectsNextValues = yield select(makeSelectProjectsNextValues());
    const projectNextValues = projectsNextValues.getIn(
      [projectId, keyId],
      IMMUTABLE_MAP,
    );
    const projectNextValue = projectNextValues.getIn(
      ['nextValue'],
      IMMUTABLE_MAP,
    );

    const nextValue = projectNextValue.set(
      'mapSpts',
      projectNextValue.get('mapSpts', IMMUTABLE_LIST).concat([mapSpt]),
    );

    yield put(
      projectsNextValuesChangeNextValueOnlyInState(
        {
          projectId,
          keyId,
          subType,
        },
        nextValue,
      ),
    );

    yield actions.changeToSuccess();
  } catch (err) {
    yield actions.changeToFailed(err);
  }
}
