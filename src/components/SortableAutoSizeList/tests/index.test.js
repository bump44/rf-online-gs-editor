import React from 'react';
import { shallow } from 'enzyme';

import SortableAutoSizeList, {
  CreateDragHangle,
  DragHangleDefault,
} from '../index';

const rowRenderer = () => <div />;

describe('<SortableAutoSizeList />', () => {
  it('Should exist', () => {
    const wrapper = shallow(
      <SortableAutoSizeList
        rowCount={10}
        rowHeight={100}
        rowRenderer={rowRenderer}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('Should create DragHangle', () => {
    const wrapper = shallow(<DragHangleDefault />);
    CreateDragHangle(DragHangleDefault);
    expect(wrapper).toMatchSnapshot();
  });
});
