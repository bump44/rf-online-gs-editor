import React from 'react';
import { shallow } from 'enzyme';

import ProjectsMediaItems from '../index';

describe('<ProjectsMediaItems />', () => {
  it('Should exist', () => {
    const wrapper = shallow(<ProjectsMediaItems />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should render items', () => {
    const wrapper = shallow(
      <ProjectsMediaItems
        items={[
          {
            id: '123',
            title: 'title',
            description: 'description',
            name: 'name',
            createdAt: '2018-01-01 06:00',
            isPublic: false,
            owner: {
              login: 'name',
              id: '456',
            },
          },
        ]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
