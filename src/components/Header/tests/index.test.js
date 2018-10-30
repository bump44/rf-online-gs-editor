import React from 'react';
import { shallow } from 'enzyme';

import Header from '../index';

const projectsImportsProcessingData = {
  isProcessing: false,
  countTotal: 0,
  countCompleted: 0,
  countProcesses: 0,
  percent: 0,
};

describe('<Header />', () => {
  it('Should exist', () => {
    const wrapper = shallow(
      <Header projectsImportsProcessingData={projectsImportsProcessingData} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
