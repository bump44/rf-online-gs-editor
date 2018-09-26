/**
 *
 * ProjectItemRowRender
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map /* , List */ } from 'immutable';
import { Grid, Label } from 'semantic-ui-react';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

import * as projectStore from '../../../containers/App/getters/projectStore';

import ProjectStoreInteractingName from '../../ProjectStore/Interacting/Name';
import ProjectStoreInteractingLastName from '../../ProjectStore/Interacting/LastName';
import ProjectStoreInteractingTrade from '../../ProjectStore/Interacting/Trade';
import ProjectStoreInteractingUseAngle from '../../ProjectStore/Interacting/UseAngle';
import ProjectStoreInteractingSize from '../../ProjectStore/Interacting/Size';
import ProjectStoreInteractingAngle from '../../ProjectStore/Interacting/Angle';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRowRender extends React.PureComponent {
  render() {
    const { item, itemNextValues, actions } = this.props;

    const bUseAngle = projectStore.getUseAngle(
      itemNextValues.get('nextValue'),
      { item },
    );

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
            onChangeValue={actions.changeLastName}
          />
        </Grid.Column>
        <Grid.Column largeScreen={12} widescreen={11}>
          <Grid columns={2}>
            <Grid.Column>
              <ProjectStoreInteractingTrade
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeTrade}
                className="pb-10"
                label={
                  <Label>
                    <FormattedMessage {...messages.Trade} />
                  </Label>
                }
              />
              <ProjectStoreInteractingUseAngle
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeUseAngle}
              />
            </Grid.Column>
            <Grid.Column>
              <ProjectStoreInteractingSize
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeSize}
                className="pb-5"
                label={
                  <Label>
                    <FormattedMessage {...messages.Size} />
                  </Label>
                }
              />

              {bUseAngle && (
                <ProjectStoreInteractingAngle
                  item={item}
                  itemNextValues={itemNextValues}
                  onChangeValue={actions.changeAngle}
                  label={
                    <Label>
                      <FormattedMessage {...messages.Angle} />
                    </Label>
                  }
                />
              )}
            </Grid.Column>
          </Grid>
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
    changeLastName: PropTypes.func.isRequired,
    changeTrade: PropTypes.func.isRequired,
    changeUseAngle: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProjectItemRowRender;
