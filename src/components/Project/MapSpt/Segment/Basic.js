/**
 *
 * ProjectMapSptSegmentBasic
 *
 */

import { Grid, Header, Segment } from 'semantic-ui-react';
import { Map, List } from 'immutable';
import * as projectMapSpt from 'containers/App/getters/projectMapSpt';
import PropTypes from 'prop-types';
import React from 'react';

import FieldFloat from '../Interacting/FieldFloat';
import FieldInteger from '../Interacting/FieldInteger';

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
        <Grid>
          <Grid.Column width={4}>{anchor}</Grid.Column>
          <Grid.Column width={2}>
            <FieldInteger value={a1} />
          </Grid.Column>
          <Grid.Column width={2}>
            <FieldInteger value={a2} />
          </Grid.Column>
          <Grid.Column width={2}>
            <FieldInteger value={a3} />
          </Grid.Column>
          <Grid.Column width={2}>
            <FieldInteger value={a4} />
          </Grid.Column>
          <Grid.Column width={2}>
            <FieldInteger value={a5} />
          </Grid.Column>
          <Grid.Column width={2}>
            <FieldInteger value={a6} />
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column>
            <FieldFloat value={b1} />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat value={b2} />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat value={b3} />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat value={b4} />
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column>
            <FieldFloat value={c1} />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat value={c2} />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat value={c3} />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat value={c4} />
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column>
            <FieldFloat value={d1} />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat value={d2} />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat value={d3} />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat value={d4} />
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column>
            <FieldFloat value={e1} />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat value={e2} />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat value={e3} />
          </Grid.Column>
          <Grid.Column>
            <FieldFloat value={e4} />
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
