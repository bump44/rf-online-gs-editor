/**
 *
 * ProjectItemRowRender
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map /* , List */ } from 'immutable';
import { Grid } from 'semantic-ui-react';

import ProjectStoreInteractingName from '../../ProjectStore/Interacting/Name';
import ProjectStoreInteractingLastName from '../../ProjectStore/Interacting/LastName';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRowRender extends React.PureComponent {
  render() {
    const { item, itemNextValues, actions } = this.props;

    return (
      <Grid columns={3}>
        <Grid.Column largeScreen={4} widescreen={5}>
          <ProjectStoreInteractingName
            item={item}
            itemNextValues={itemNextValues}
            onChangeValue={actions.changeName}
            className="pb-5"
          />
          <ProjectStoreInteractingLastName
            item={item}
            itemNextValues={itemNextValues}
            onChangeValue={actions.changeName}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

ProjectItemRowRender.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  // moneyTypes: PropTypes.instanceOf(List).isRequired,
  actions: PropTypes.shape({
    changeName: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProjectItemRowRender;
