/**
 *
 * ProjectStoreInteractingItemsList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
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
    this.renderItemList = this.renderItemList.bind(this);
  }

  renderItemList(
    index,
    {
      virtualized: { isVisible, isScrolling },
    },
  ) {
    const { item, itemNextValues } = this.props;

    if (!isVisible || isScrolling) {
      return null;
    }

    return (
      <ProjectStoreInteractingItemList
        item={item}
        itemNextValues={itemNextValues}
        index={index}
        dragHandle={<DragHandle />}
      />
    );
  }

  render() {
    return (
      <SortableAutoSizeList
        rowHeight={55}
        rowCount={200}
        rowRenderer={this.renderItemList}
        useDragHandle
      />
    );
  }
}

ProjectStoreInteractingItemsList.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
};

ProjectStoreInteractingItemsList.defaultProps = {};

export default ProjectStoreInteractingItemsList;
