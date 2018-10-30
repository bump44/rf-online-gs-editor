import React from 'react';
import { shallow } from 'enzyme';

import ProjectsMediaItem from '../index';

describe('<ProjectsMediaItem />', () => {
  it('Should exist', () => {
    const wrapper = shallow(
      <ProjectsMediaItem
        item={{
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
        }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
