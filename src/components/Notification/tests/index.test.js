import React from 'react';
import { shallow } from 'enzyme';

import Notification from '../index';

describe('<Notification />', () => {
  it('Should exist', () => {
    const wrapper = shallow(<Notification />);
    expect(wrapper).toMatchSnapshot();
  });
});
