/**
 *
 * ProjectBoxItemOutRow
 *
 */

import { Grid } from 'semantic-ui-react';
import { IMMUTABLE_MAP } from '~/containers/App/constants';
import { Map, List } from 'immutable';
import * as projectBoxItemOut from '~/containers/App/getters/projectBoxItemOut';
import * as projectItem from '~/containers/App/getters/projectItem';
import PropTypes from 'prop-types';
import React from 'react';

import Code from '../../Code';
import ProjectBoxItemOutLabelDetail from '../BoxItemOutLabelDetail';
import ProjectItemLabelDetail from '../ItemLabelDetail';
import Render from './Render';
import Row from './styles';

/* eslint-disable react/prefer-stateless-function */
class ProjectBoxItemOutRow extends React.PureComponent {
  renderTagIndexWithNextState() {
    const {
      boxItemOut,
      boxItemOutNextValues,
      selectable,
      onClickSelect,
      nextValues,
      itemActions,
    } = this.props;

    const componentProps = {};

    if (selectable) {
      componentProps.onClick = onClickSelect;
    }

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

    return (
      <React.Fragment>
        <ProjectBoxItemOutLabelDetail
          boxItemOut={boxItemOut}
          boxItemOutNextValues={boxItemOutNextValues}
          {...componentProps}
        />
        {item && (
          <ProjectItemLabelDetail
            item={item}
            itemNextValues={itemNextValues}
            itemActions={itemActions}
            link
          />
        )}
      </React.Fragment>
    );
  }

  render() {
    const {
      boxItemOut,
      boxItemOutNextValues,
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      nextValues,
      localSettings,
      boxItemOutActions,
      itemActions,
      entriesFinderItemsActions,
      entriesFinderItems,
    } = this.props;

    return (
      <Row>
        <Grid columns={2}>
          <Grid.Column largeScreen={3} widescreen={2}>
            {this.renderTagIndexWithNextState()}

            <div className="mt-5">
              <Code>{boxItemOut.get('strCode')}</Code>
            </div>
          </Grid.Column>
          <Grid.Column largeScreen={13} widescreen={14}>
            <Render
              boxItemOut={boxItemOut}
              boxItemOutNextValues={boxItemOutNextValues}
              moneyTypes={moneyTypes}
              itemGradeTypes={itemGradeTypes}
              weaponTypes={weaponTypes}
              nextValues={nextValues}
              localSettings={localSettings}
              boxItemOutActions={boxItemOutActions}
              itemActions={itemActions}
              entriesFinderItemsActions={entriesFinderItemsActions}
              entriesFinderItems={entriesFinderItems}
            />
          </Grid.Column>
        </Grid>
      </Row>
    );
  }
}

ProjectBoxItemOutRow.propTypes = {
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
  selectable: PropTypes.bool,
  onClickSelect: PropTypes.func,
};

ProjectBoxItemOutRow.defaultProps = {
  selectable: false,
  onClickSelect: undefined,
};

export default ProjectBoxItemOutRow;
