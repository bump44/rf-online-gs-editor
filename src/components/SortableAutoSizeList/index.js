/**
 *
 * SortableAutoSizeList
 *
 */

import React from 'react';
import { AutoSizer, List } from 'react-virtualized';
import PropTypes from 'prop-types';

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';

import { Icon } from 'semantic-ui-react';

const RowRenderer = rowRenderer => props => (
  <Item
    key={props.key} // eslint-disable-line
    index={props.index} // eslint-disable-line
    virtualized={props}
    rowRenderer={rowRenderer}
  />
);

const styleContainer = { height: '100%' };

const Container = SortableContainer(
  ({ rowRenderer, rowHeight, rowCount, registerChild }) => (
    <div style={styleContainer}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={registerChild}
            height={height}
            rowCount={rowCount}
            rowHeight={rowHeight}
            rowRenderer={rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  ),
);

const Item = SortableElement(props => {
  const {
    virtualized: { style, key, index },
  } = props;

  const { rowRenderer, ...nextProps } = props;

  return (
    <div style={style} key={key} data-index={index}>
      {rowRenderer && rowRenderer(index, nextProps)}
    </div>
  );
});

/* eslint-disable react/prefer-stateless-function */
class SortableAutoSizeList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.forceUpdateGrid = () =>
      this.list ? this.list.forceUpdateGrid() : false;

    this.registerChild = list => {
      this.list = list;
      return list;
    };

    this.rowRenderer = undefined;
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  componentWillMount() {
    const { props } = this;
    this.rowRenderer = RowRenderer(props.rowRenderer);
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;
    this.rowRenderer =
      nextProps.rowRenderer !== props.rowRenderer
        ? RowRenderer(props.rowRenderer)
        : this.rowRenderer;
  }

  onSortEnd({ oldIndex, newIndex }) {
    const { rowCount, onSortEnd } = this.props;
    if (!onSortEnd) {
      return;
    }

    const curr = Array.from(Array(rowCount)).map((_, index) => index);
    const next = arrayMove(curr, oldIndex, newIndex);
    onSortEnd(next);
  }

  render() {
    const { rowCount, rowHeight, useDragHandle } = this.props;

    return (
      <Container
        rowCount={rowCount}
        rowHeight={rowHeight}
        rowRenderer={this.rowRenderer}
        registerChild={this.registerChild}
        useDragHandle={useDragHandle}
        onSortEnd={this.onSortEnd}
      />
    );
  }
}

SortableAutoSizeList.propTypes = {
  rowCount: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  rowRenderer: PropTypes.func.isRequired,
  useDragHandle: PropTypes.bool,
  onSortEnd: PropTypes.func,
};

SortableAutoSizeList.defaultProps = {
  useDragHandle: false,
  onSortEnd: undefined,
};

export default SortableAutoSizeList;
export const CreateDragHangle = func => SortableHandle(func);
export const DragHangleDefault = () => (
  <span className="draghandle">
    <Icon name="bars" />
  </span>
);
