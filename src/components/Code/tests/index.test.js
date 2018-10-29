import React from 'react';
import { shallow } from 'enzyme';

import Code from '../index';

describe('<Code />', () => {
  it('Should exist', () => {
    const wrapper = shallow(<Code />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Code__Text').prop('onClick')).toBeInstanceOf(Function);
  });
  it('Should have children', () => {
    const children = 'children';
    const wrapper = shallow(<Code>{children}</Code>);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Code__Text').text()).toEqual(children);
  });
  it('Should have onClick', () => {
    const onClick = () => null;
    const wrapper = shallow(<Code onClick={onClick} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Code__Text').prop('onClick')).toBeInstanceOf(Function);
  });
});
