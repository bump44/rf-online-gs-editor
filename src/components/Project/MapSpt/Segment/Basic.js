/**
 *
 * ProjectMapSptSegmentBasic
 *
 */

import { Grid, Segment, Label, Icon } from 'semantic-ui-react';
import { Map } from 'immutable';

import * as projectMapSpt from '~/containers/App/getters/projectMapSpt';
import PropTypes from 'prop-types';
import React from 'react';

import FieldFloat from '../Interacting/FieldFloat';
import FieldInteger from '../Interacting/FieldInteger';

import {
  getIconName,
  getStatusColor,
} from '~/containers/App/getters/nextValues';

import Notification from '~/components/Notification';

/* eslint-disable react/prefer-stateless-function */
class ProjectMapSptSegmentBasic extends React.PureComponent {
  render() {
    const { mapSptActions, mapSptNextValues, mapSpt } = this.props;

    const mapSptNextValue = mapSptNextValues.get('nextValue');
    const anchor = projectMapSpt.getAnchor(mapSptNextValue, { entry: mapSpt });

    const a1 = projectMapSpt.getA1(mapSptNextValue, { entry: mapSpt });
    const a2 = projectMapSpt.getA2(mapSptNextValue, { entry: mapSpt });
    const a3 = projectMapSpt.getA3(mapSptNextValue, { entry: mapSpt });
    const a4 = projectMapSpt.getA4(mapSptNextValue, { entry: mapSpt });
    const a5 = projectMapSpt.getA5(mapSptNextValue, { entry: mapSpt });
    const a6 = projectMapSpt.getA6(mapSptNextValue, { entry: mapSpt });

    const b1 = projectMapSpt.getB1(mapSptNextValue, { entry: mapSpt });
    const b2 = projectMapSpt.getB2(mapSptNextValue, { entry: mapSpt });
    const b3 = projectMapSpt.getB3(mapSptNextValue, { entry: mapSpt });
    const b4 = projectMapSpt.getB4(mapSptNextValue, { entry: mapSpt });

    const c1 = projectMapSpt.getC1(mapSptNextValue, { entry: mapSpt });
    const c2 = projectMapSpt.getC2(mapSptNextValue, { entry: mapSpt });
    const c3 = projectMapSpt.getC3(mapSptNextValue, { entry: mapSpt });
    const c4 = projectMapSpt.getC4(mapSptNextValue, { entry: mapSpt });

    const d1 = projectMapSpt.getD1(mapSptNextValue, { entry: mapSpt });
    const d2 = projectMapSpt.getD2(mapSptNextValue, { entry: mapSpt });
    const d3 = projectMapSpt.getD3(mapSptNextValue, { entry: mapSpt });
    const d4 = projectMapSpt.getD4(mapSptNextValue, { entry: mapSpt });

    const e1 = projectMapSpt.getE1(mapSptNextValue, { entry: mapSpt });
    const e2 = projectMapSpt.getE2(mapSptNextValue, { entry: mapSpt });
    const e3 = projectMapSpt.getE3(mapSptNextValue, { entry: mapSpt });
    const e4 = projectMapSpt.getE4(mapSptNextValue, { entry: mapSpt });

    return (
      <Segment color="yellow">
        {mapSptNextValues.get('isError') && (
          <Notification type="danger">
            {mapSptNextValues.get('errorMessage')}
          </Notification>
        )}
        <Grid>
          <Grid.Column width={4}>
            <Label color={getStatusColor(mapSptNextValues)}>
              <Icon
                loading={mapSptNextValues.get('isSaving')}
                name={getIconName(mapSptNextValues)}
              />
              <Label.Detail>{anchor}</Label.Detail>
            </Label>
          </Grid.Column>
          <Grid.Column width={2}>
            <FieldInteger
              value={a1}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeA1}
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <FieldInteger
              value={a2}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeA2}
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <FieldInteger
              value={a3}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeA3}
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <FieldInteger
              value={a4}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeA4}
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <FieldInteger
              value={a5}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeA5}
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <FieldInteger
              value={a6}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeA6}
            />
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column>
            <FieldFloat
              value={b1}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeB1}
            />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat
              value={b2}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeB2}
            />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat
              value={b3}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeB3}
            />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat
              value={b4}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeB4}
            />
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column>
            <FieldFloat
              value={c1}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeC1}
            />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat
              value={c2}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeC2}
            />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat
              value={c3}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeC3}
            />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat
              value={c4}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeC4}
            />
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column>
            <FieldFloat
              value={d1}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeD1}
            />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat
              value={d2}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeD2}
            />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat
              value={d3}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeD3}
            />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat
              value={d4}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeD4}
            />
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column>
            <FieldFloat
              value={e1}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeE1}
            />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat
              value={e2}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeE2}
            />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat
              value={e3}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeE3}
            />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat
              value={e4}
              mapSpt={mapSpt}
              onChangeValue={mapSptActions.changeE4}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

ProjectMapSptSegmentBasic.propTypes = {
  mapSpt: PropTypes.instanceOf(Map).isRequired,
  mapSptNextValues: PropTypes.instanceOf(Map).isRequired,
  mapSptActions: PropTypes.object.isRequired,
};

export default ProjectMapSptSegmentBasic;
