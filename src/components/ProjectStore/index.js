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
import ProjectStoreInteractingItemsListCount from './Interacting/ItemsListCount';

/* eslint-disable react/prefer-stateless-function */
class ProjectStore extends React.PureComponent {
  render() {
    const {
      store,
      storeNextValues,
      nextValues,
      storeActions,
      itemActions,
      localSettings,
      moneyTypes,
      itemGrades,
      weaponTypes,
      entriesFinderItems,
      entriesFinderItemsActions,
    } = this.props;

    const bUseAngle = projectStore.getUseAngle(
      storeNextValues.get('nextValue'),
      { store },
    );

    return (
      <React.Fragment>
        <Segment>
          <Grid columns={3}>
            <Grid.Column largeScreen={4} widescreen={5}>
              <ProjectStoreInteractingName
                store={store}
                storeNextValues={storeNextValues}
                onChangeValue={storeActions.changeName}
                className="pb-5"
              />
              <ProjectStoreInteractingLastName
                store={store}
                storeNextValues={storeNextValues}
                onChangeValue={storeActions.changeLastName}
              />
            </Grid.Column>
            <Grid.Column largeScreen={12} widescreen={11}>
              <Grid columns={2}>
                <Grid.Column>
                  <ProjectStoreInteractingTrade
                    store={store}
                    storeNextValues={storeNextValues}
                    onChangeValue={storeActions.changeTrade}
                    className="pb-10"
                    label={
                      <Label>
                        <FormattedMessage {...messages.Trade} />
                      </Label>
                    }
                  />
                  <ProjectStoreInteractingUseAngle
                    store={store}
                    storeNextValues={storeNextValues}
                    onChangeValue={storeActions.changeUseAngle}
                  />
                </Grid.Column>
                <Grid.Column>
                  <ProjectStoreInteractingSize
                    store={store}
                    storeNextValues={storeNextValues}
                    onChangeValue={storeActions.changeSize}
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
                        store={store}
                        storeNextValues={storeNextValues}
                        onChangeValue={storeActions.changeAngle}
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

        <ProjectStoreInteractingItemsListCount
          store={store}
          storeNextValues={storeNextValues}
          onChangeValue={storeActions.changeItemsListCount}
          label={
            <Label>
              <FormattedMessage {...messages.VendorItemsListCount} />
            </Label>
          }
          fluid={false}
          className="mb-15"
        />

        <ProjectStoreInteractingItemsList
          store={store}
          storeNextValues={storeNextValues}
          storeActions={storeActions}
          nextValues={nextValues}
          itemActions={itemActions}
          localSettings={localSettings}
          moneyTypes={moneyTypes}
          itemGrades={itemGrades}
          weaponTypes={weaponTypes}
          entriesFinderItems={entriesFinderItems}
          entriesFinderItemsActions={entriesFinderItemsActions}
        />
      </React.Fragment>
    );
  }
}

ProjectStore.propTypes = {
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,

  storeActions: PropTypes.shape({
    changeName: PropTypes.func.isRequired,
    changeLastName: PropTypes.func.isRequired,
    changeTrade: PropTypes.func.isRequired,
    changeUseAngle: PropTypes.func.isRequired,
  }).isRequired,

  itemActions: PropTypes.object.isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGrades: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
};

export default ProjectStore;
