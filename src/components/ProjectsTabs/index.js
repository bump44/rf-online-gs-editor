/**
 *
 * ProjectsTabs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ProjectsTabs({ isLoggedIn, active }) {
  return (
    <div className="tabs">
      <ul>
        {isLoggedIn && (
          <li className={cx({ 'is-active': active === 'my' })}>
            <NavLink to="/projects/my">
              <FormattedMessage {...messages.My} />
            </NavLink>
          </li>
        )}
        <li className={cx({ 'is-active': active === 'public' })}>
          <NavLink to="/projects/public">
            <FormattedMessage {...messages.Public} />
          </NavLink>
        </li>
        <li className={cx({ 'is-active': active === 'latestReleases' })}>
          <NavLink to="/projects/latestReleases">
            <FormattedMessage {...messages.LatestReleases} />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

ProjectsTabs.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  active: PropTypes.oneOf(['my', 'public', 'latestReleases']),
};

export default ProjectsTabs;
