/**
 *
 * ProjectStoreInteractingItemsList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { Dimmer, Loader } from 'semantic-ui-react';
import {
  DISABLE_RENDER_ITEMS_IS_SCROLLING,
  DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE,
} from '../../../containers/App/constants';

import SortableAutoSizeList, {
  CreateDragHangle,
  DragHangleDefault,
} from '../../SortableAutoSizeList';

import ProjectStoreInteractingItemList from './ItemList';

const DragHandle = CreateDragHangle(DragHangleDefault);

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreInteractingItemsList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onSortEnd = this.onSortEnd.bind(this);
    this.renderItemList = this.renderItemList.bind(this);
    this.sortableAutoSizeList = undefined;

    /* eslint-disable */
    this.createRef = sortableAutoSizeList =>
      (this.sortableAutoSizeList = sortableAutoSizeList);
    /* eslint-enable */
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    if (
      this.sortableAutoSizeList &&
      nextProps.projectNextValues &&
      !nextProps.projectNextValues.equals(props.projectNextValues)
    ) {
      this.sortableAutoSizeList.forceUpdateGrid();
    }
  }

  onSortEnd(nextIndexes) {
    const { actions, item } = this.props;
    actions.itemsListResort(item, nextIndexes);
  }

  renderItemList(
    index,
    {
      virtualized: { isVisible, isScrolling },
    },
  ) {
    const {
      item,
      itemNextValues,
      projectNextValues,
      itemActions,
      localSettings,
      moneyTypes,
      itemGrades,
      actions,
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

    if (!(disableRenderItemsIsScrolling && isScrolling)) {
      return (
        <ProjectStoreInteractingItemList
          item={item}
          itemNextValues={itemNextValues}
          index={index}
          dragHandle={<DragHandle />}
          projectNextValues={projectNextValues}
          actions={actions}
          itemActions={itemActions}
          localSettings={localSettings}
          moneyTypes={moneyTypes}
          itemGrades={itemGrades}
        />
      );
    }

    return (
      <Dimmer active inverted>
        <Loader inverted />
      </Dimmer>
    );
  }

  render() {
    return (
      <SortableAutoSizeList
        ref={this.createRef}
        rowHeight={75}
        rowCount={200}
        rowRenderer={this.renderItemList}
        useDragHandle
        onSortEnd={this.onSortEnd}
      />
    );
  }
}

ProjectStoreInteractingItemsList.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  projectNextValues: PropTypes.instanceOf(Map).isRequired,
  actions: PropTypes.object.isRequired,
  itemActions: PropTypes.object.isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGrades: PropTypes.instanceOf(List).isRequired,
};

ProjectStoreInteractingItemsList.defaultProps = {};

export default ProjectStoreInteractingItemsList;
