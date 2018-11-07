/**
 *
 * ProjectStore
 *
 */

import { FormattedMessage } from 'react-intl';
import { Grid, Transition, Label, Segment } from 'semantic-ui-react';
import { Map, List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import { getUseAngle } from '~/containers/App/getters/projectStore';

import messages from '../messages';
import ProjectStoreInteractingAngle from '../Interacting/Angle';
import ProjectStoreInteractingCode from '../Interacting/Code';
import ProjectStoreInteractingLastName from '../Interacting/LastName';
import ProjectStoreInteractingModel from '../Interacting/Model';
import ProjectStoreInteractingName from '../Interacting/Name';
import ProjectStoreInteractingSize from '../Interacting/Size';
import ProjectStoreInteractingTrade from '../Interacting/Trade';
import ProjectStoreInteractingUseAngle from '../Interacting/UseAngle';
import ProjectStoreInteractingRaceSelect from '../Interacting/RaceSelect';

/* eslint-disable react/prefer-stateless-function */
class ProjectStore extends React.PureComponent {
  render() {
    const { store, storeNextValues, storeActions } = this.props;

    const bUseAngle = getUseAngle(storeNextValues.get('nextValue'), {
      entry: store,
    });

    return (
      <Segment>
        <Grid columns={3}>
          <Grid.Column largeScreen={4} widescreen={5}>
            <ProjectStoreInteractingName
              store={store}
              storeNextValues={storeNextValues}
              onChangeValue={storeActions.changeName}
              className="pb-5"
              label={
                <ProjectStoreInteractingRaceSelect
                  store={store}
                  storeNextValues={storeNextValues}
                  onChangeValue={storeActions.changeRace}
                  fluid={false}
                />
              }
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

        <Grid columns="equal">
          <Grid.Column>
            <ProjectStoreInteractingCode
              store={store}
              storeNextValues={storeNextValues}
              onChangeValue={storeActions.changeCode}
              label={
                <Label>
                  <FormattedMessage {...messages.Code} />
                </Label>
              }
            />
          </Grid.Column>
          <Grid.Column>
            <ProjectStoreInteractingModel
              store={store}
              storeNextValues={storeNextValues}
              onChangeValue={storeActions.changeModel}
              label={
                <Label>
                  <FormattedMessage {...messages.Model} />
                </Label>
              }
            />
          </Grid.Column>
        </Grid>
      </Segment>
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
  mapSptActions: PropTypes.object.isRequired,
  resourceActions: PropTypes.object.isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,

  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  mapNameTypes: PropTypes.instanceOf(List).isRequired,
};

export default ProjectStore;
