import React from 'react';
import { shallow } from 'enzyme';

import ProjectCreateForm from '../index';

describe('<ProjectCreateForm />', () => {
  it('Should exist', () => {
    const wrapper = shallow(
      <ProjectCreateForm
        values={{
          title: 'title',
          description: 'description',
          isPublic: false,
        }}
        onSubmit={() => undefined}
        onChangeTitle={() => undefined}
        onChangeDescription={() => undefined}
        onChangeIsPublic={() => undefined}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
