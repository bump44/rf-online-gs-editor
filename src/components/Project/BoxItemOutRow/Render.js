/**
 *
 * ProjectBoxItemOutRender
 *
 */

import { FormattedMessage } from 'react-intl';
import { Grid, Label, Icon, Modal, Button } from 'semantic-ui-react';
import { IMMUTABLE_MAP } from 'containers/App/constants';
import { Link } from 'react-router-dom';
import { Map, List } from 'immutable';
import * as projectBoxItemOut from 'containers/App/getters/projectBoxItemOut';
import * as projectItem from 'containers/App/getters/projectItem';
import PropTypes from 'prop-types';
import React from 'react';

import messages from './messages';
import ProjectBoxItemOutInteractingOutputs from '../BoxItemOut/Interacting/Outputs';
import ProjectBoxItemOutInteractingOutputsProbDetail from '../BoxItemOut/Interacting/OutputsProbDetail';
import ProjectBoxItemOutLabelDetail from '../BoxItemOutLabelDetail';
import ProjectItemInteractingName from '../Item/Interacting/Name';

/* eslint-disable react/prefer-stateless-function */
class ProjectBoxItemOutRender extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.renderOutputsProbDetails = this.renderOutputsProbDetails.bind(this);
    this.getItemData = this.getItemData.bind(this);
  }

  getItemData() {
    const { boxItemOutNextValues, boxItemOut, nextValues } = this.props;

    const item = projectBoxItemOut.getItem(
      boxItemOutNextValues.get('nextValue'),
      {
        entry: boxItemOut,
      },
    );

    const itemNextValues = nextValues.get(
      projectItem.getId(undefined, { entry: item }),
      IMMUTABLE_MAP,
    );

    return { item, itemNextValues };
  }

  renderOutputsProbDetails() {
    const { boxItemOutNextValues, boxItemOut } = this.props;

    return (
      <ProjectBoxItemOutInteractingOutputsProbDetail
        boxItemOutNextValues={boxItemOutNextValues}
        boxItemOut={boxItemOut}
      />
    );
  }

  renderItem() {
    const { itemActions } = this.props;
    const { item, itemNextValues } = this.getItemData();

    return (
      <React.Fragment>
        {item && (
          <ProjectItemInteractingName
            item={item}
            itemNextValues={itemNextValues}
            onChangeValue={itemActions.changeName}
          />
        )}
        {!item && (
          <div>
            <FormattedMessage {...messages.UnknownItem} />
          </div>
        )}
      </React.Fragment>
    );
  }

  render() {
    const { item, itemNextValues } = this.getItemData();
    const {
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      nextValues,
      boxItemOut,
      boxItemOutNextValues,
      localSettings,
      boxItemOutActions,
      itemActions,
      entriesFinderItemsActions,
      entriesFinderItems,
    } = this.props;

    return (
      <Grid columns={2}>
        <Grid.Column largeScreen={12} widescreen={8}>
          <div className="mb-5">{this.renderItem()}</div>
          {this.renderOutputsProbDetails()}
        </Grid.Column>
        <Grid.Column largeScreen={4} widescreen={8}>
          {item && (
            <Label
              as={Link}
              to={projectItem.getRouteLink(itemNextValues.get('nextValue'), {
                entry: item,
              })}
            >
              <Icon name="linkify" fitted />
            </Label>
          )}

          <Modal
            trigger={
              <Button size="mini" primary>
                <Icon name="pencil" />{' '}
                <FormattedMessage {...messages.EditRaw} />
              </Button>
            }
          >
            <Modal.Content scrolling>
              <Modal.Description>
                <div>
                  <div className="mb-15">
                    <ProjectBoxItemOutLabelDetail
                      boxItemOutActions={boxItemOutActions}
                      boxItemOut={boxItemOut}
                      boxItemOutNextValues={boxItemOutNextValues}
                    />
                  </div>
                  {this.renderOutputsProbDetails()}
                </div>
                <ProjectBoxItemOutInteractingOutputs
                  moneyTypes={moneyTypes}
                  itemGradeTypes={itemGradeTypes}
                  weaponTypes={weaponTypes}
                  nextValues={nextValues}
                  boxItemOut={boxItemOut}
                  boxItemOutNextValues={boxItemOutNextValues}
                  localSettings={localSettings}
                  boxItemOutActions={boxItemOutActions}
                  itemActions={itemActions}
                  entriesFinderItemsActions={entriesFinderItemsActions}
                  entriesFinderItems={entriesFinderItems}
                />
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Grid.Column>
      </Grid>
    );
  }
}

ProjectBoxItemOutRender.propTypes = {
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  boxItemOut: PropTypes.instanceOf(Map).isRequired,
  boxItemOutNextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  boxItemOutActions: PropTypes.object.isRequired,
  itemActions: PropTypes.object.isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
};

export default ProjectBoxItemOutRender;
