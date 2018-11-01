import { merge } from 'lodash';
import { shallow } from 'enzyme';
import React from 'react';

import { LoginPage, mapDispatchToProps } from '../index';

const projectsImportsProcessingData = {
  isProcessing: false,
  countTotal: 0,
  countCompleted: 0,
  countProcesses: 0,
  percent: 0,
};

function getProps(nextProps = {}) {
  return merge(
    {
      dispatch: jest.fn(action => action),
      changeIdent: jest.fn(),
      changePassword: jest.fn(),
      changeLocation: jest.fn(),
      submit: jest.fn(),
      isLoggedIn: false,
      loginPage: {},
      projectsImportsProcessingData,
    },
    nextProps,
  );
}

describe('<LoginPage />', () => {
  it('should exist', () => {
    const props = getProps();
    const wrapper = shallow(<LoginPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render errorMessage', () => {
    const props = getProps({
      loginPage: {
        isError: true,
        errorMessage: 'Error message',
      },
    });
    const wrapper = shallow(<LoginPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should call redirectToMainPageIfIsLoggedIn on didMount & willReceiveProps', () => {
    const spy = jest.spyOn(
      LoginPage.prototype,
      'redirectToMainPageIfIsLoggedIn',
    );
    const props = getProps();
    const wrapper = shallow(<LoginPage {...props} />);
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.setProps({ isLoggedIn: false });
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockClear();
  });
  it('should redirectToMainPageIfIsLoggedIn on willReceiveProps', () => {
    const spy = jest.spyOn(
      LoginPage.prototype,
      'redirectToMainPageIfIsLoggedIn',
    );
    const props = getProps();
    const wrapper = shallow(<LoginPage {...props} />);
    wrapper.setProps({ isLoggedIn: true });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(props.changeLocation.mock.calls.length).toBe(1);
    spy.mockClear();
  });
  it('should redirectToMainPageIfIsLoggedIn on didMount', () => {
    const spy = jest.spyOn(
      LoginPage.prototype,
      'redirectToMainPageIfIsLoggedIn',
    );
    const props = getProps({ isLoggedIn: true });
    shallow(<LoginPage {...props} />);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(props.changeLocation.mock.calls.length).toBe(1);
    spy.mockClear();
  });
  it('directly test mapDispatchToProps', () => {
    const dispatch = jest.fn(action => action);
    const dispatchers = mapDispatchToProps(dispatch);

    expect(
      dispatchers.changeIdent({ target: { value: 'test' } }),
    ).toMatchSnapshot();
    expect(
      dispatchers.changePassword({ target: { value: 'test' } }),
    ).toMatchSnapshot();
    expect(dispatchers.changeLocation()).toMatchSnapshot();
    expect(dispatchers.changeLocation('/some-page')).toMatchSnapshot();
    expect(dispatchers.submit()).toMatchSnapshot();
    expect(dispatch.mock.calls.length).toBe(5);
  });
});
