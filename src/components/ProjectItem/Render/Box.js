/**
 *
 * ProjectItemRenderBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { Tab, Segment } from 'semantic-ui-react';
import { IMMUTABLE_MAP } from '../../../containers/App/constants';
import SegmentBasic from '../Segment/Basic';
import * as projectItem from '../../../containers/App/getters/projectItem';
import * as projectBoxItemOut from '../../../containers/App/getters/projectBoxItemOut';

import ProjectBoxItemOutLabelDetail from '../../ProjectBoxItemOutLabelDetail';
import ProjectBoxItemOutInteractingOutputsProbDetail from '../../ProjectBoxItemOut/Interacting/OutputsProbDetail';
import ProjectBoxItemOutInteractingOutputs from '../../ProjectBoxItemOut/Interacting/Outputs';

const tabStyle = { height: '100%' };
const tabMenu = {
  secondary: true,
  pointing: true,
};
// const tabPaneStyle = {
//   padding: 0,
//   background: 'none',
//   border: 0,
//   boxShadow: 'none',
//   height: '100%',
// };

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRenderBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getTabPanes = this.getTabPanes.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderBasic = this.renderBasic.bind(this);
    this.renderOutputs = this.renderOutputs.bind(this);
  }

  getTabPanes() {
    return [
      {
        menuItem: { key: 'basics', content: 'Basic' },
        render: this.renderBasic,
      },
      {
        menuItem: { key: 'outputs', content: 'Outputs' },
        render: this.renderOutputs,
      },
    ];
  }

  renderOutputs() {
    const {
      item,
      itemNextValues,
      nextValues,
      boxItemOutActions,
      entriesFinderItemsActions,
      entriesFinderItems,
      itemActions,
      moneyTypes,
      itemGrades,
      weaponTypes,
      localSettings,
    } = this.props;

    const boxItemOut = projectItem.getBoxItemOut(
      itemNextValues.get('nextValue'),
      { entry: item },
    );

    if (!boxItemOut) {
      return <div>Outputs not defined</div>;
    }

    const boxItemOutNextValues = nextValues.get(
      projectBoxItemOut.getId(undefined, { entry: boxItemOut }),
      IMMUTABLE_MAP,
    );

    return (
      <Segment>
        <ProjectBoxItemOutLabelDetail
          boxItemOut={boxItemOut}
          boxItemOutNextValues={boxItemOutNextValues}
        />

        <ProjectBoxItemOutInteractingOutputsProbDetail
          boxItemOut={boxItemOut}
          boxItemOutNextValues={boxItemOutNextValues}
        />

        <ProjectBoxItemOutInteractingOutputs
          boxItemOut={boxItemOut}
          boxItemOutNextValues={boxItemOutNextValues}
          boxItemOutActions={boxItemOutActions}
          nextValues={nextValues}
          entriesFinderItemsActions={entriesFinderItemsActions}
          entriesFinderItems={entriesFinderItems}
          itemActions={itemActions}
          moneyTypes={moneyTypes}
          itemGrades={itemGrades}
          weaponTypes={weaponTypes}
          localSettings={localSettings}
        />
      </Segment>
    );
  }

  renderBasic() {
    const {
      item,
      itemNextValues,
      itemActions,
      moneyTypes,
      itemGrades,
    } = this.props;

    return (
      <SegmentBasic
        item={item}
        itemNextValues={itemNextValues}
        itemActions={itemActions}
        moneyTypes={moneyTypes}
        itemGrades={itemGrades}
      />
    );
  }

  renderTabs() {
    return <Tab menu={tabMenu} panes={this.getTabPanes()} style={tabStyle} />;
  }

  render() {
    return this.renderTabs();
  }
}

ProjectItemRenderBox.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGrades: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  itemActions: PropTypes.object.isRequired,
  boxItemOutActions: PropTypes.object.isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
};

export default ProjectItemRenderBox;
