/**
 *
 * Header
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import packagejson from '../../../package.json';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Brand>
          <LinkItemBrand to="/">
            <FormattedMessage {...messages.brand} />
            <BrandVersionBadge>v{packagejson.version}</BrandVersionBadge>
          </LinkItemBrand>
        </Brand>
        <div className="navbar-menu">
          <div className="navbar-start">
            <LinkItem to="/">
              <FormattedMessage {...messages.home} />
            </LinkItem>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <LinkButton to="/projects/create" className="is-primary">
                    <FormattedMessage {...messages.createProject} />
                  </LinkButton>
                </p>
                <p className="control">
                  <LinkButton to="/login" className="is-black">
                    <FormattedMessage {...messages.signIn} />
                  </LinkButton>
                </p>
                <p className="control">
                  <LinkButton to="/register" className="is-black">
                    <FormattedMessage {...messages.signUp} />
                  </LinkButton>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

Header.propTypes = {};

export default Header;

const Wrapper = styled.header.attrs({ className: 'navbar' })`
  background: #2a3142;
  -webkit-app-region: drag;
`;

const Brand = styled.div.attrs({ className: 'navbar-brand' })``;

const LinkButton = styled(NavLink).attrs({ to: '/', className: 'button' })`
  -webkit-app-region: no-drag;
`;

const LinkItem = styled(NavLink).attrs({ to: '/', className: 'navbar-item' })`
  color: #ddd;
  -webkit-app-region: no-drag;
  transition: all 0.1s ease;
`;

const LinkItemBrand = styled(LinkItem).attrs({ to: '/' })`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  text-shadow: 1px 1px 0px #2f2f2f;
  position: relative;
  top: -5px;
  transition: all 0.1s ease;
  &.active {
    color: #2d74de;
  }
  &.navbar-item:hover,
  &:hover {
    color: #fff;
  }
`;

const BrandVersionBadge = styled.span`
  position: absolute;
  top: 30px;
  font-size: 10px;
  text-transform: lowercase;
  color: gray;
`;
