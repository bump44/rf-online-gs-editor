/**
 *
 * ProjectItemVirtualizedRow
 *
 */

import { Dimmer, Loader } from 'semantic-ui-react';
import { List, Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import {
  DISABLE_RENDER_ITEMS_IS_SCROLLING,
  DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE,
  IMMUTABLE_MAP,
} from '~/containers/App/constants';

import Row from '../ItemRow/styles';
import ProjectItemRow from '../ItemRow';

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
      itemActions,
      nextValues,
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      localSettings,
      isScrolling,
      isVisible,
      selectable,
      onClickSelect,
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
      const itemNextValues = nextValues.get(item.get('id'), IMMUTABLE_MAP);

      return (
        <ProjectItemRow
          nextValues={nextValues}
          itemActions={itemActions}
          item={item}
          itemNextValues={itemNextValues}
          moneyTypes={moneyTypes}
          itemGradeTypes={itemGradeTypes}
          weaponTypes={weaponTypes}
          localSettings={localSettings}
          selectable={selectable}
          onClickSelect={onClickSelect}
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
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  itemActions: PropTypes.object.isRequired,
  selectable: PropTypes.bool,
  onClickSelect: PropTypes.func,
};

ProjectItemRow.defaultProps = {
  selectable: false,
  onClickSelect: undefined,
};

export default ProjectItemVirtualizedRow;
