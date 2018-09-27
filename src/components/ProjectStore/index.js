/**
 *
 * ProjectStore
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { Segment, Grid, Transition, Label, Header } from 'semantic-ui-react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import * as projectStore from '../../containers/App/getters/projectStore';

import ProjectStoreInteractingName from './Interacting/Name';
import ProjectStoreInteractingLastName from './Interacting/LastName';
import ProjectStoreInteractingTrade from './Interacting/Trade';
import ProjectStoreInteractingUseAngle from './Interacting/UseAngle';
import ProjectStoreInteractingSize from './Interacting/Size';
import ProjectStoreInteractingAngle from './Interacting/Angle';
import ProjectStoreInteractingItemsList from './Interacting/ItemsList';

/* eslint-disable react/prefer-stateless-function */
class ProjectStore extends React.PureComponent {
  render() {
    const { item, itemNextValues, actions } = this.props;

    const bUseAngle = projectStore.getUseAngle(
      itemNextValues.get('nextValue'),
      { item },
    );

    return (
      <React.Fragment>
        <Segment>
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

                  <Transition
                    visible={bUseAngle}
                    animation="scale"
                    duration={500}
                  >
                    <div>
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
                    </div>
                  </Transition>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </Segment>
        <Header as="h4">
          <FormattedMessage {...messages.Items} />
        </Header>

        <ProjectStoreInteractingItemsList
          item={item}
          itemNextValues={itemNextValues}
        />
      </React.Fragment>
    );
  }
}

ProjectStore.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  actions: PropTypes.shape({
    changeName: PropTypes.func.isRequired,
    changeLastName: PropTypes.func.isRequired,
    changeTrade: PropTypes.func.isRequired,
    changeUseAngle: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProjectStore;
