/**
 *
 * ProjectItemSegmentEffects
 *
 */

import { Map, List } from 'immutable';
import { Segment, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import ProjectItemInteractingEffectType from '../Interacting/EffectType';
import ProjectItemInteractingEffectValue from '../Interacting/EffectValue';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemSegmentEffects extends React.PureComponent {
  render() {
    const { item, itemNextValues, itemActions, effectTypes } = this.props;

    return (
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={5}>
            <ProjectItemInteractingEffectType
              item={item}
              itemNextValues={itemNextValues}
              n={1}
              types={effectTypes}
              onChangeValue={itemActions.changeEffectTypeValue}
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <ProjectItemInteractingEffectValue
              item={item}
              itemNextValues={itemNextValues}
              n={1}
              onChangeValue={itemActions.changeEffectValue}
            />
          </Grid.Column>
        </Grid>
        <Grid columns={2}>
          <Grid.Column width={5}>
            <ProjectItemInteractingEffectType
              item={item}
              itemNextValues={itemNextValues}
              n={2}
              types={effectTypes}
              onChangeValue={itemActions.changeEffectTypeValue}
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <ProjectItemInteractingEffectValue
              item={item}
              itemNextValues={itemNextValues}
              n={2}
              onChangeValue={itemActions.changeEffectValue}
            />
          </Grid.Column>
        </Grid>
        <Grid columns={2}>
          <Grid.Column width={5}>
            <ProjectItemInteractingEffectType
              item={item}
              itemNextValues={itemNextValues}
              n={3}
              types={effectTypes}
              onChangeValue={itemActions.changeEffectTypeValue}
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <ProjectItemInteractingEffectValue
              item={item}
              itemNextValues={itemNextValues}
              n={3}
              onChangeValue={itemActions.changeEffectValue}
            />
          </Grid.Column>
        </Grid>
        <Grid columns={2}>
          <Grid.Column width={5}>
            <ProjectItemInteractingEffectType
              item={item}
              itemNextValues={itemNextValues}
              n={4}
              types={effectTypes}
              onChangeValue={itemActions.changeEffectTypeValue}
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <ProjectItemInteractingEffectValue
              item={item}
              itemNextValues={itemNextValues}
              n={4}
              onChangeValue={itemActions.changeEffectValue}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

ProjectItemSegmentEffects.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  effectTypes: PropTypes.instanceOf(List).isRequired,
  itemActions: PropTypes.object.isRequired,
};

export default ProjectItemSegmentEffects;
