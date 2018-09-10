/**
 *
 * ProjectMedia
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Map } from 'immutable';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import moment from 'moment';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function ProjectMedia({ project, currentUser }) {
  const { title, description, name, id, createdAt, owner, isPublic } = project;
  const isCurrentIsOwner = currentUser && currentUser.get('id') === owner.id;

  return (
    <Media>
      <div className="media-content">
        <p className="title is-6 mb-5">
          <small>
            <i
              className={cx('fas', {
                'fa-unlock': isPublic,
                'fa-lock': !isPublic,
              })}
            />
          </small>
          &nbsp;
          <NavLink to={`/project/${id}`}>{title}</NavLink>
          &nbsp;
          <small className="has-text-grey is-size-7 is-italic">#{name}</small>
        </p>
        {description && <Description>{description}</Description>}
        <p>
          <span
            className={cx('tag', 'is-small', {
              'is-success': isCurrentIsOwner,
              'is-info': !isCurrentIsOwner,
            })}
          >
            @{owner.login}
          </span>
          &nbsp;
          <small className="has-text-grey is-size-7 is-italic">
            {moment(createdAt).format('LLL')}
          </small>
        </p>
      </div>
    </Media>
  );
}

ProjectMedia.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  }),
  currentUser: PropTypes.instanceOf(Map),
};

ProjectMedia.defaultProps = {
  currentUser: null,
};

export default ProjectMedia;

const Media = styled.div.attrs({ className: 'media' })`
  padding: 10px;
  border-top: 0;
  border-bottom: 0;
  background: #f1f1f1;
  + .media {
    margin-top: 0;
    border-top: 0;
  }

  &:nth-child(even) {
    background: #fff;
  }

  &:hover {
    background: #ddd;
  }
`;

const Description = styled.p`
  margin-bottom: 7px;
  font-size: 12px;
`;
