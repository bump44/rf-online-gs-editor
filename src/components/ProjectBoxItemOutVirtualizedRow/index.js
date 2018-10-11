/**
 *
 * ProjectBoxItemOutVirtualizedRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import { Dimmer, Loader } from 'semantic-ui-react';

import Row from '../ProjectItemRow/styles';
import ProjectBoxItemOutRow from '../ProjectBoxItemOutRow';

import {
  DISABLE_RENDER_ITEMS_IS_SCROLLING,
  DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE,
  IMMUTABLE_MAP,
} from '../../containers/App/constants';

/* eslint-disable react/prefer-stateless-function */
class ProjectBoxItemOutVirtualizedRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow() {
    const {
      index,
      boxItemOuts,
      boxItemOutActions,
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
      entriesFinderItemsActions,
      entriesFinderItems,
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

    const boxItemOut = boxItemOuts.get(index);

    if (boxItemOut && !(disableRenderItemsIsScrolling && isScrolling)) {
      const boxItemOutNextValues = nextValues.get(
        boxItemOut.get('id'),
        IMMUTABLE_MAP,
      );

      return (
        <ProjectBoxItemOutRow
          nextValues={nextValues}
          boxItemOutActions={boxItemOutActions}
          itemActions={itemActions}
          boxItemOut={boxItemOut}
          boxItemOutNextValues={boxItemOutNextValues}
          moneyTypes={moneyTypes}
          itemGradeTypes={itemGradeTypes}
          weaponTypes={weaponTypes}
          localSettings={localSettings}
          selectable={selectable}
          onClickSelect={onClickSelect}
          entriesFinderItemsActions={entriesFinderItemsActions}
          entriesFinderItems={entriesFinderItems}
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

ProjectBoxItemOutVirtualizedRow.propTypes = {
  index: PropTypes.number.isRequired,
  isScrolling: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired,
  boxItemOuts: PropTypes.instanceOf(List).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  boxItemOutActions: PropTypes.object.isRequired,
  itemActions: PropTypes.object.isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
  selectable: PropTypes.bool,
  onClickSelect: PropTypes.func,
};

ProjectBoxItemOutVirtualizedRow.defaultProps = {
  selectable: false,
  onClickSelect: undefined,
};

export default ProjectBoxItemOutVirtualizedRow;
