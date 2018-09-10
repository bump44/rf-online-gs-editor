/**
 *
 * ProjectMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ProjectMenu({ projectId }) {
  return (
    <Aside>
      <p className="menu-label">
        <FormattedMessage {...messages.General} />
      </p>
      <ul className="menu-list">
        <li>
          <Link to={`/project/${projectId}`}>
            <FormattedMessage {...messages.Dashboard} />
          </Link>
        </li>
        <li>
          <Link to={`/project/${projectId}/contributors`}>
            <FormattedMessage {...messages.Contributors} />
          </Link>
        </li>
      </ul>
      <p className="menu-label">
        <FormattedMessage {...messages.Administration} />
      </p>
      <ul className="menu-list">
        <li>
          <Link to={`/project/${projectId}/details`}>
            <FormattedMessage {...messages.UpdateDetails} />
          </Link>
        </li>
        <li>
          <Link to={`/project/${projectId}/remove`}>
            <FormattedMessage {...messages.RemoveProject} />
          </Link>
        </li>
      </ul>
      <p className="menu-label">
        <FormattedMessage {...messages.ImportExportFiles} />
      </p>
      <ul className="menu-list">
        <li>
          <Link to={`/project/${projectId}/import`}>
            <FormattedMessage {...messages.ImportFiles} />
          </Link>
        </li>
        <li>
          <Link to={`/project/${projectId}/export`}>
            <FormattedMessage {...messages.ExportFiles} />
          </Link>
        </li>
      </ul>
    </Aside>
  );
}

ProjectMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  projectId: PropTypes.string.isRequired,
  currentProject: PropTypes.instanceOf(Map),
  currentUser: PropTypes.instanceOf(Map),
};

ProjectMenu.defaultProps = {
  currentProject: null,
  currentUser: null,
};

export default ProjectMenu;

const Link = styled(NavLink).attrs({ activeClassName: 'is-active' })``;
const Aside = styled.aside.attrs({ className: 'menu' })`
  background: #fff;
  padding: 15px;
  border-radius: 3px;
  box-shadow: 0 -3px 31px 0 rgba(0, 0, 0, 0.05),
    0 6px 20px 0 rgba(0, 0, 0, 0.02);
`;
