import React from 'react';
import { shallow } from 'enzyme';

import InfiniteAutoSizeList from '../index';

const isRowLoaded = () => false;
const loadMoreRows = () => Promise.resolve();
const rowRenderer = () => <div />;

describe('<InfiniteAutoSizeList />', () => {
  it('Should exist', () => {
    const wrapper = shallow(
      <InfiniteAutoSizeList
        rowCount={0}
        rowHeight={100}
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowRenderer={rowRenderer}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
