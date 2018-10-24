/**
 *
 * ProjectStoreInteractingItemsList
 *
 */

import { Dimmer, Loader } from 'semantic-ui-react';
import { Map, List } from 'immutable';
import { max, min } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getItemsListCount,
  getLimItemsListCount,
} from '~/containers/App/getters/projectStore';

import {
  DISABLE_RENDER_ITEMS_IS_SCROLLING,
  DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE,
} from '~/containers/App/constants';

import SortableAutoSizeList, {
  CreateDragHangle,
  DragHangleDefault,
} from '../../../SortableAutoSizeList';

import ProjectStoreInteractingItemList from './ItemList';
import ProjectStoreInteractingLimItemList from './LimItemList';

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

    if (this.sortableAutoSizeList) {
      const statements = [
        nextProps.nextValues && !nextProps.nextValues.equals(props.nextValues),
        nextProps.entriesFinderItems &&
          !nextProps.entriesFinderItems.equals(props.entriesFinderItems),
      ];
      if (statements.some(statement => statement)) {
        this.sortableAutoSizeList.forceUpdateGrid();
      }
    }
  }

  onSortEnd(nextIndexes) {
    const { storeActions, store } = this.props;
    storeActions.itemsListResort(store, nextIndexes);
  }

  renderItemList(
    index,
    {
      virtualized: { isVisible, isScrolling },
    },
  ) {
    const {
      store,
      storeNextValues,
      storeActions,
      nextValues,
      itemActions,
      localSettings,
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      entriesFinderItems,
      entriesFinderItemsActions,
      isLimitedList,
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

    const Component = isLimitedList
      ? ProjectStoreInteractingLimItemList
      : ProjectStoreInteractingItemList;

    if (!(disableRenderItemsIsScrolling && isScrolling)) {
      return (
        <Component
          store={store}
          storeNextValues={storeNextValues}
          storeActions={storeActions}
          index={index}
          dragHandle={<DragHandle />}
          nextValues={nextValues}
          itemActions={itemActions}
          localSettings={localSettings}
          moneyTypes={moneyTypes}
          itemGradeTypes={itemGradeTypes}
          weaponTypes={weaponTypes}
          entriesFinderItems={entriesFinderItems}
          entriesFinderItemsActions={entriesFinderItemsActions}
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
    const { store, storeNextValues, isLimitedList } = this.props;
    const nextValue = storeNextValues.get('nextValue');

    const listCount =
      (isLimitedList
        ? getLimItemsListCount(nextValue, { entry: store })
        : getItemsListCount(nextValue, { entry: store })) + 1;

    return (
      <SortableAutoSizeList
        ref={this.createRef}
        rowHeight={85}
        rowCount={min([isLimitedList ? 16 : 200, max([1, listCount])])}
        rowRenderer={this.renderItemList}
        useDragHandle
        onSortEnd={this.onSortEnd}
      />
    );
  }
}

ProjectStoreInteractingItemsList.propTypes = {
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  storeActions: PropTypes.object.isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  itemActions: PropTypes.object.isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
  isLimitedList: PropTypes.bool,
};

ProjectStoreInteractingItemsList.defaultProps = {
  isLimitedList: false,
};

export default ProjectStoreInteractingItemsList;
