/**
 *
 * ProjectStoreSegmentBindings
 *
 */

import { Map } from 'immutable';
import { Segment, Button, Label, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import { IMMUTABLE_MAP } from '~/containers/App/constants';
import { getSubTask } from '~/containers/App/getters/nextValues';
import Notification from '~/components/Notification';

import {
  getSdCode,
  getBdCode,
  getMapCode,
  getMapSpts,
} from '~/containers/App/getters/projectStore';

import ProjectStoreInteractingMapNameType from '../Interacting/MapNameType';
import ProjectMapSptSegmentBasic from '../../MapSpt/Segment/Basic';
import withActions from '../HOC/Actions';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreSegmentBindings extends React.PureComponent {
  renderLabels() {
    const { store, storeNextValues } = this.props;

    const storeNextValue = storeNextValues.get('nextValue');
    const sdCode = getSdCode(storeNextValue, { entry: store });
    const bdCode = getBdCode(storeNextValue, { entry: store });
    const mapCode = getMapCode(storeNextValue, { entry: store });

    const labels = [
      { value: sdCode, color: 'green' },
      { value: bdCode, color: 'blue' },
      { value: mapCode, color: 'black' },
    ].filter(o => !!o.value);

    return (
      <React.Fragment>
        {labels.map(({ value, ...props }) => (
          <Label {...props} key={value}>
            {value}
          </Label>
        ))}
        {labels.length > 0 && <Divider />}
      </React.Fragment>
    );
  }

  render() {
    const {
      store,
      storeNextValues,
      nextValues,
      mapNameTypes,
      storeActions,
      mapSptActions,
      storeWrappedActions,
    } = this.props;

    const storeNextValue = storeNextValues.get('nextValue');
    const sdCode = getSdCode(storeNextValue, { entry: store });
    const bdCode = getBdCode(storeNextValue, { entry: store });
    const mapSpts = getMapSpts(storeNextValue, { entry: store });

    const sdIsExists = mapSpts.some(
      mapSpt => mapSpt.get('strAnchor') === sdCode,
    );
    const bdIsExists = mapSpts.some(
      mapSpt => mapSpt.get('strAnchor') === bdCode,
    );

    const actionCreateMapSpt = getSubTask(storeNextValues, 'createMapSpt');

    return (
      <Segment>
        {this.renderLabels()}
        {actionCreateMapSpt.isError && (
          <Notification type="danger">
            {actionCreateMapSpt.errorMessage}
          </Notification>
        )}

        {!sdIsExists && (
          <Button
            primary
            size="mini"
            disabled={actionCreateMapSpt.isProcessing}
            loading={actionCreateMapSpt.isProcessing}
            onClick={storeWrappedActions.createMapSptSd}
          >
            Create SD MapSpt
          </Button>
        )}

        {!bdIsExists && (
          <Button
            primary
            size="mini"
            disabled={actionCreateMapSpt.isProcessing}
            loading={actionCreateMapSpt.isProcessing}
            onClick={storeWrappedActions.createMapSptBd}
          >
            Create BD MapSpt
          </Button>
        )}

        {(!sdIsExists || !bdIsExists) && <Divider />}

        <ProjectStoreInteractingMapNameType
          store={store}
          storeNextValues={storeNextValues}
          types={mapNameTypes}
          onChangeValue={storeActions.changeMapCode}
          disabled={actionCreateMapSpt.isProcessing}
        />

        {mapSpts.map(mapSpt => (
          <ProjectMapSptSegmentBasic
            key={mapSpt.get('id')}
            mapSpt={mapSpt}
            mapSptNextValues={nextValues.get(mapSpt.get('id'), IMMUTABLE_MAP)}
            nextValues={nextValues}
            mapSptActions={mapSptActions}
            mapNameTypes={mapNameTypes}
          />
        ))}
      </Segment>
    );
  }
}

ProjectStoreSegmentBindings.propTypes = {
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  storeWrappedActions: PropTypes.shape({
    createMapSptBd: PropTypes.func.isRequired,
    createMapSptSd: PropTypes.func.isRequired,
  }).isRequired,
};

export default withActions(ProjectStoreSegmentBindings);
