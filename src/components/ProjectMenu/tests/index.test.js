import React from 'react';
import { shallow } from 'enzyme';

import ProjectMenu from '../index';

const projectImportsProcessingData = {
  isProcessing: false,
  countTotal: 0,
  countCompleted: 0,
  countProcesses: 0,
  percent: 0,
};

describe('<ProjectMenu />', () => {
  it('Should exist', () => {
    const wrapper = shallow(
      <ProjectMenu
        projectId="123"
        projectImportsProcessingData={projectImportsProcessingData}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
