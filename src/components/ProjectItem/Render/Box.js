/**
 *
 * ProjectItemRenderBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { Tab } from 'semantic-ui-react';
import SegmentBasic from '../Segment/Basic';

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
    return <div>renderOutputs</div>;
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
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGrades: PropTypes.instanceOf(List).isRequired,
  itemActions: PropTypes.object.isRequired,
};

export default ProjectItemRenderBox;
