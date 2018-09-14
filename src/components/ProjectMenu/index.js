/**
 *
 * ProjectMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ProjectMenu({ projectId, project, currentUser }) {
  const isCurrentIsOwner =
    project &&
    currentUser &&
    currentUser.get('id') === project.getIn(['owner', 'id']);

  return (
    <Aside>
      <p className="menu-label">
        <FormattedMessage {...messages.General} />
      </p>
      <ul className="menu-list">
        <li>
          <Link exact to={`/project/${projectId}`}>
            <FormattedMessage {...messages.Dashboard} />
          </Link>
        </li>
        <li>
          <Link to={`/project/${projectId}/contributors`}>
            <FormattedMessage {...messages.Contributors} />
          </Link>
        </li>
      </ul>
      {isCurrentIsOwner && (
        <React.Fragment>
          <p className="menu-label">
            <FormattedMessage {...messages.Manage} />
          </p>
          <ul className="menu-list">
            <li>
              <Link to={`/project/${projectId}/items`}>
                <FormattedMessage {...messages.Items} />
                &nbsp;
                <span className="tag is-small is-primary">
                  {project.getIn(['items', 'total'])}
                </span>
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
        </React.Fragment>
      )}
    </Aside>
  );
}

ProjectMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  projectId: PropTypes.string.isRequired,
  project: PropTypes.instanceOf(Map),
  currentUser: PropTypes.instanceOf(Map),
};

ProjectMenu.defaultProps = {
  project: null,
  currentUser: null,
};

export default ProjectMenu;

const Link = styled(NavLink).attrs({ activeClassName: 'is-active' })``;
const Aside = styled.aside.attrs({ className: 'menu' })`
  background: #fff;
  padding: 15px;
  border-radius: 3px;
  height: calc(100vh - 73.5px);
  overflow-y: auto;
  box-shadow: 0 -3px 31px 0 rgba(0, 0, 0, 0.05),
    0 6px 20px 0 rgba(0, 0, 0, 0.02);
`;
