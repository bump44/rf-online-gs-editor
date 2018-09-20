/**
 *
 * ProjectItemVirtualizedRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
// import styled from 'styled-components';

import Row from '../ProjectItemRow/styles';
import ProjectItemRow from '../ProjectItemRow';
import {
  DISABLE_RENDER_ITEMS_IS_SCROLLING,
  DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE,
} from '../../containers/App/constants';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemVirtualizedRow extends React.Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { index, items, nextValues } = this.props;
    const item = items.get(index);
    const nextItem = nextProps.items.get(index);

    if (!item && nextItem) {
      return true;
    }

    if (item && nextItem && !item.equals(nextItem)) {
      return true;
    }

    if (item) {
      const itemNextValues = nextValues.get(item.get('id'), Map({}));
      if (
        !itemNextValues.equals(
          nextProps.nextValues.get(item.get('id'), Map({})),
        )
      ) {
        return true;
      }
    }

    return false;
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
        <span className="tag is-warning">
          <i className="fas fa-spin fa-spinner" />
        </span>
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
