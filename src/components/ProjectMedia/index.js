/**
 *
 * ProjectMedia
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Map } from 'immutable';
import cx from 'classnames';
import moment from 'moment';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function ProjectMedia({ project, currentUser }) {
  const { title, createdAt, owner } = project;
  const isCurrentIsOwner = currentUser && currentUser.get('id') === owner.id;

  return (
    <Media>
      <div className="media-content">
        <p className="title is-4">
          {title}
          &nbsp;
          <small className="has-text-grey is-size-7 is-italic">
            {moment(createdAt).format('LLL')}
          </small>
        </p>
        <p className="subtitle is-6">
          <span
            className={cx('tag', 'is-small', {
              'is-success': isCurrentIsOwner,
              'is-info': !isCurrentIsOwner,
            })}
          >
            @{owner.login}
          </span>
        </p>
      </div>
    </Media>
  );
}

ProjectMedia.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
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
