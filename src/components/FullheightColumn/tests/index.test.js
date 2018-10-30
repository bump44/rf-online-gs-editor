import React from 'react';
import { shallow } from 'enzyme';

import FullheightColumn, { FullheightThis } from '../index';

describe('<FullheightColumn />', () => {
  it('Should exist', () => {
    const wrapper = shallow(
      <FullheightColumn>
        <div />
      </FullheightColumn>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('Should exist FullheightThis', () => {
    const wrapper = shallow(
      <FullheightThis>
        <div />
      </FullheightThis>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
