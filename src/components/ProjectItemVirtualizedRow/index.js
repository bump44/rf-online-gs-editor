/**
 *
 * ProjectItemVirtualizedRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import { Dimmer, Loader } from 'semantic-ui-react';
// import styled from 'styled-components';

import Row from '../ProjectItemRow/styles';
import ProjectItemRow from '../ProjectItemRow';

import {
  DISABLE_RENDER_ITEMS_IS_SCROLLING,
  DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE,
} from '../../containers/App/constants';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemVirtualizedRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow() {
    const {
      index,
      items,
      actions,
      nextValues,
      moneyTypes,
      itemGrades,
      weaponTypes,
      localSettings,
      isScrolling,
      isVisible,
    } = this.props;

    const disableRenderItemsIsScrolling = localSettings.get(
      DISABLE_RENDER_ITEMS_IS_SCROLLING,
    );

    const disableRenderItemsIsNotVisible = localSettings.get(
      DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE,
    );

    if (disableRenderItemsIsNotVisible && !isVisible) {
      return null;
    }

    const item = items.get(index);

    if (item && !(disableRenderItemsIsScrolling && isScrolling)) {
      const itemNextValues = nextValues.get(item.get('id'), Map({}));

      return (
        <ProjectItemRow
          nextValues={nextValues}
          actions={actions}
          items={items}
          item={item}
          itemNextValues={itemNextValues}
          moneyTypes={moneyTypes}
          itemGrades={itemGrades}
          weaponTypes={weaponTypes}
          localSettings={localSettings}
        />
      );
    }

    return (
      <Row>
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      </Row>
    );
  }

  render() {
    const { style } = this.props;
    return <div style={style}>{this.renderRow()}</div>;
  }
}

ProjectItemVirtualizedRow.propTypes = {
  index: PropTypes.number.isRequired,
  isScrolling: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired,
  items: PropTypes.instanceOf(List).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGrades: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  actions: PropTypes.object.isRequired,
};

export default ProjectItemVirtualizedRow;
