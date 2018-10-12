/**
 *
 * ProjectItemRenderArmor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { Tab } from 'semantic-ui-react';
import SegmentBasicArmor from '../Segment/BasicArmor';
import SegmentExperts from '../Segment/Experts';
import SegmentEffects from '../Segment/Effects';

const tabStyle = { height: '100%' };
const tabMenu = {
  secondary: true,
  pointing: true,
};

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRenderArmor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getTabPanes = this.getTabPanes.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderBasic = this.renderBasic.bind(this);
    this.renderExperts = this.renderExperts.bind(this);
    this.renderEffects = this.renderEffects.bind(this);
  }

  getTabPanes() {
    return [
      {
        menuItem: { key: 'basics', content: 'Basic' },
        render: this.renderBasic,
      },
      {
        menuItem: { key: 'experts', content: 'Experts' },
        render: this.renderExperts,
      },
      {
        menuItem: { key: 'effects', content: 'Effects' },
        render: this.renderEffects,
      },
    ];
  }

  renderExperts() {
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
      expertTypes,
      effectTypes,
    } = this.props;

    return (
      <SegmentExperts
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
        expertTypes={expertTypes}
        effectTypes={effectTypes}
      />
    );
  }

  renderEffects() {
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
      expertTypes,
      effectTypes,
    } = this.props;

    return (
      <SegmentEffects
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
        expertTypes={expertTypes}
        effectTypes={effectTypes}
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
      <SegmentBasicArmor
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

ProjectItemRenderArmor.propTypes = {
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

export default ProjectItemRenderArmor;
