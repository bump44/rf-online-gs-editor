import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from '../index';

describe('<LoadingIndicator />', () => {
  it('Should exist', () => {
    const wrapper = shallow(<LoadingIndicator />);
    expect(wrapper).toMatchSnapshot();
  });
});
