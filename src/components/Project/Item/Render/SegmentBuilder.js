/**
 *
 * ProjectItemRenderSegmentBuilder
 *
 */

import { Map, List } from 'immutable';
import { Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

const tabStyle = { height: '100%' };
const tabMenu = {
  secondary: true,
  pointing: true,
};

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRenderSegmentBuilder extends React.PureComponent {
  constructor(props) {
    super(props);
    this.tabPanes = [];
    this.addTabPane = (key, content, WrappedComponent) => {
      this.tabPanes.push({
        menuItem: { key, content },
        render: this.renderTabPane(WrappedComponent),
      });
      return this;
    };
    this.renderTabPane = WrappedComponent => () => (
      <WrappedComponent {...this.props} />
    );
    this.getTabPanes = () => this.tabPanes;
  }

  render() {
    return <Tab menu={tabMenu} panes={this.tabPanes} style={tabStyle} />;
  }
}

ProjectItemRenderSegmentBuilder.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  expertTypes: PropTypes.instanceOf(List).isRequired,
  effectTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  itemActions: PropTypes.object.isRequired,
  boxItemOutActions: PropTypes.object.isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
};

export default ProjectItemRenderSegmentBuilder;
