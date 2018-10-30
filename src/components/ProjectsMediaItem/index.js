/**
 *
 * ProjectsMediaItem
 *
 */

import { Item, Icon } from 'semantic-ui-react';
import { Map } from 'immutable';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

function ProjectsMediaItem({ item, currentUser }) {
  const { title, description, name, id, createdAt, owner, isPublic } = item;
  const isCurrentIsOwner = !!(
    currentUser && currentUser.get('id') === owner.id
  );

  return (
    <Item>
      <Item.Content>
        <Item.Header as={NavLink} to={`/project/${id}`}>
          <Icon name={isPublic ? 'unlock' : 'lock'} />
          {title || name}
        </Item.Header>

        <Item.Meta>
          <small className="name">#{name}</small>
        </Item.Meta>
        <Item.Description>{description || '—'}</Item.Description>
        <Item.Extra>
          <UserName active={isCurrentIsOwner}>
            <Icon name="user" />@{owner.login}
          </UserName>
          <Icon name="time" />
          {moment(createdAt).format('LLL')}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

ProjectsMediaItem.propTypes = {
  item: PropTypes.shape({
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
  }).isRequired,
  currentUser: PropTypes.instanceOf(Map),
};

ProjectsMediaItem.defaultProps = {
  currentUser: null,
};

export default ProjectsMediaItem;

const UserName = styled.span`
  padding-right: 15px;
  ${({ active }) =>
    active &&
    `
    color: green;
    `};
`;
