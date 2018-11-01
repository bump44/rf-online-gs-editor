import { shallow } from 'enzyme';
import immutable from 'immutable';
import React from 'react';

import ProjectsMediaItem from '../index';

const props = {
  item: {
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
  currentUser: immutable.fromJS({ id: '456', login: 'name' }),
};

describe('<ProjectsMediaItem />', () => {
  it('Should exist', () => {
    const wrapper = shallow(<ProjectsMediaItem item={props.item} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should render userName active badge', () => {
    const wrapper = shallow(
      <ProjectsMediaItem item={props.item} currentUser={props.currentUser} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
