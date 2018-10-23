/**
 *
 * ProjectItemRowRender
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import { Map /* , List */ } from 'immutable';
import { Grid, Label, Transition } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import * as projectStore from 'containers/App/getters/projectStore';

import messages from '../messages';
import ProjectStoreInteractingName from '../../Store/Interacting/Name';
import ProjectStoreInteractingLastName from '../../Store/Interacting/LastName';
import ProjectStoreInteractingTrade from '../../Store/Interacting/Trade';
import ProjectStoreInteractingUseAngle from '../../Store/Interacting/UseAngle';
import ProjectStoreInteractingSize from '../../Store/Interacting/Size';
import ProjectStoreInteractingAngle from '../../Store/Interacting/Angle';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRowRender extends React.PureComponent {
  render() {
    const { store, storeNextValues, storeActions } = this.props;

    const bUseAngle = projectStore.getUseAngle(
      storeNextValues.get('nextValue'),
      { entry: store },
    );

    return (
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

              <Transition visible={bUseAngle} animation="scale" duration={500}>
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
    );
  }
}

ProjectItemRowRender.propTypes = {
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  storeActions: PropTypes.shape({
    changeName: PropTypes.func.isRequired,
    changeLastName: PropTypes.func.isRequired,
    changeTrade: PropTypes.func.isRequired,
    changeUseAngle: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProjectItemRowRender;
