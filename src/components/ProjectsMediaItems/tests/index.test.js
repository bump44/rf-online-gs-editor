import React from 'react';
import { shallow } from 'enzyme';

import ProjectsMediaItems from '../index';

describe('<ProjectsMediaItems />', () => {
  it('Should exist', () => {
    const wrapper = shallow(<ProjectsMediaItems />);
    expect(wrapper).toMatchSnapshot();
  });
});
