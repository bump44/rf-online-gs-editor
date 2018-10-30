import React from 'react';
import { shallow } from 'enzyme';

import Container from '../index';

describe('<Container />', () => {
  it('Should exist', () => {
    const wrapper = shallow(<Container />);
    expect(wrapper).toMatchSnapshot();
  });
});
