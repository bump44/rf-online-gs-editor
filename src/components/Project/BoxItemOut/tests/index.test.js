import React from 'react';
import { shallow } from 'enzyme';

import ProjectBoxItemOut from '../index';

describe('<ProjectBoxItemOut />', () => {
  it('Should exist', () => {
    const wrapper = shallow(<ProjectBoxItemOut />);
    expect(wrapper).toMatchSnapshot();
  });
});
