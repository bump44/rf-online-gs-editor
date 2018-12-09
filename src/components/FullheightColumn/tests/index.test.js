import 'jest-styled-components';
import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import FullheightColumn, {
  FullheightThis,
  FullheightAutoSizer,
  FullheightAutoSizerChild,
} from '../index';

describe('<FullheightColumn />', () => {
  // test styled
  it('should exist FullheightThis', () => {
    const rendered = renderer.create(<FullheightThis />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
  it('should render FullheightThis with custom props', () => {
    const rendered = renderer
      .create(<FullheightThis paddingTop={10} paddingBottom={99} />)
      .toJSON();
    expect(rendered).toMatchSnapshot();
  });
  it('should exist FullheightAutoSizerChild', () => {
    const rendered = renderer.create(<FullheightAutoSizerChild />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
  it('should render FullheightAutoSizerChild with custom props', () => {
    const rendered = renderer
      .create(<FullheightAutoSizerChild width={10} height={99} />)
      .toJSON();
    expect(rendered).toMatchSnapshot();
  });
  it('should exist FullheightAutoSizer', () => {
    const wrapper = shallow(
      <FullheightAutoSizer>
        <div />
      </FullheightAutoSizer>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should exist FullheightColumn', () => {
    const wrapper = shallow(
      <FullheightColumn>
        <div />
      </FullheightColumn>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
