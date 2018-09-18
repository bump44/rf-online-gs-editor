/**
 *
 * InfiniteAutoSizeList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { InfiniteLoader, AutoSizer, List } from 'react-virtualized';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class InfiniteAutoSizeList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.forceUpdateGrid = () =>
      this.list ? this.list.forceUpdateGrid() : false;
  }

  render() {
    const {
      rowCount,
      isRowLoaded,
      loadMoreRows,
      rowHeight,
      rowRenderer,
    } = this.props;

    return (
      <InfiniteLoader
        rowCount={rowCount}
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ height, width }) => (
              <List
                ref={list => {
                  this.list = list;
                  return registerChild(this.list);
                }}
                width={width}
                height={height}
                rowCount={rowCount}
                rowHeight={rowHeight}
                onRowsRendered={onRowsRendered}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    );
  }
}

InfiniteAutoSizeList.propTypes = {
  rowCount: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  isRowLoaded: PropTypes.func.isRequired,
  loadMoreRows: PropTypes.func.isRequired,
  rowRenderer: PropTypes.func.isRequired,
};

export default InfiniteAutoSizeList;
