/**
 *
 * ProjectItemRenderBox
 *
 */

import { Map, List } from 'immutable';
import { Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import SegmentBasic from '../Segment/Basic';
import SegmentBoxOuts from '../Segment/BoxOuts';

const tabStyle = { height: '100%' };
const tabMenu = {
  secondary: true,
  pointing: true,
};

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
      itemGradeTypes,
      weaponTypes,
      localSettings,
    } = this.props;

    return (
      <SegmentBoxOuts
        item={item}
        itemNextValues={itemNextValues}
        nextValues={nextValues}
        boxItemOutActions={boxItemOutActions}
        entriesFinderItemsActions={entriesFinderItemsActions}
        entriesFinderItems={entriesFinderItems}
        itemActions={itemActions}
        moneyTypes={moneyTypes}
        itemGradeTypes={itemGradeTypes}
        weaponTypes={weaponTypes}
        localSettings={localSettings}
      />
    );
  }

  renderBasic() {
    const {
      item,
      itemNextValues,
      itemActions,
      moneyTypes,
      itemGradeTypes,
    } = this.props;

    return (
      <SegmentBasic
        item={item}
        itemNextValues={itemNextValues}
        itemActions={itemActions}
        moneyTypes={moneyTypes}
        itemGradeTypes={itemGradeTypes}
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
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  itemActions: PropTypes.object.isRequired,
  boxItemOutActions: PropTypes.object.isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
};

export default ProjectItemRenderBox;
