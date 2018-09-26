/**
 *
 * ProjectStoreRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { Grid } from 'semantic-ui-react';

import ProjectStoreLabelDetail from '../ProjectStoreLabelDetail';
import Render from './Render';
import Row from './styles';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderTagIndexWithNextState = this.renderTagIndexWithNextState.bind(
      this,
    );
  }

  renderTagIndexWithNextState() {
    const { item, itemNextValues } = this.props;

    return (
      <ProjectStoreLabelDetail
        item={item}
        itemNextValues={itemNextValues}
        link
      />
    );
  }

  render() {
    const {
      items,
      item,
      itemNextValues,
      actions,
      moneyTypes,
      itemGrades,
      weaponTypes,
      localSettings,
    } = this.props;

    return (
      <Row>
        <Grid columns={2}>
          <Grid.Column largeScreen={3} widescreen={2}>
            {this.renderTagIndexWithNextState()}

            <div className="mt-5" />
          </Grid.Column>
          <Grid.Column largeScreen={13} widescreen={14}>
            {Render && (
              <Render
                item={item}
                itemNextValues={itemNextValues}
                items={items}
                actions={actions}
                moneyTypes={moneyTypes}
                itemGrades={itemGrades}
                weaponTypes={weaponTypes}
                localSettings={localSettings}
              />
            )}
          </Grid.Column>
        </Grid>
      </Row>
    );
  }
}

ProjectStoreRow.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  items: PropTypes.instanceOf(List).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGrades: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  actions: PropTypes.object.isRequired,
};

export default ProjectStoreRow;
