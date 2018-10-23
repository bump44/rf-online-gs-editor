/**
 *
 * ProjectItemSegmentExperts
 *
 */

import { Map, List } from 'immutable';
import { Segment, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import ProjectItemInteractingExpertType from '../Interacting/ExpertType';
import ProjectItemInteractingExpertValue from '../Interacting/ExpertValue';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemSegmentExperts extends React.PureComponent {
  render() {
    const { item, itemNextValues, itemActions, expertTypes } = this.props;

    return (
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={3}>
            <ProjectItemInteractingExpertType
              item={item}
              itemNextValues={itemNextValues}
              n={1}
              types={expertTypes}
              onChangeValue={itemActions.changeExpertTypeValue}
            />
          </Grid.Column>
          <Grid.Column width={13}>
            <ProjectItemInteractingExpertValue
              item={item}
              itemNextValues={itemNextValues}
              n={1}
              onChangeValue={itemActions.changeExpertValue}
            />
          </Grid.Column>
        </Grid>
        <Grid columns={2}>
          <Grid.Column width={3}>
            <ProjectItemInteractingExpertType
              item={item}
              itemNextValues={itemNextValues}
              n={2}
              types={expertTypes}
              onChangeValue={itemActions.changeExpertTypeValue}
            />
          </Grid.Column>
          <Grid.Column width={13}>
            <ProjectItemInteractingExpertValue
              item={item}
              itemNextValues={itemNextValues}
              n={2}
              onChangeValue={itemActions.changeExpertValue}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

ProjectItemSegmentExperts.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  expertTypes: PropTypes.instanceOf(List).isRequired,
  itemActions: PropTypes.object.isRequired,
};

export default ProjectItemSegmentExperts;
