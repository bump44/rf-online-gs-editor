/**
 *
 * ProjectMenu
 *
 */

import { FormattedMessage } from 'react-intl';
import { Map } from 'immutable';
import { Menu, Label, Progress } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import messages from './messages';

function ProjectMenuIsOwnerItems({
  projectId,
  project,
  projectImportsProcessingData,
}) {
  const projectImportsProcessingDataIs =
    projectImportsProcessingData && projectImportsProcessingData.isProcessing;

  return (
    <React.Fragment>
      <Menu.Item header>
        <FormattedMessage {...messages.Manage} />
      </Menu.Item>
      <Menu.Item as={NavLink} to={`/project/${projectId}/items`} exact>
        <FormattedMessage {...messages.Items} />
        <Label circular color="green">
          {project.getIn(['items', 'total'], 0)}
        </Label>
      </Menu.Item>
      <Menu.Item as={NavLink} to={`/project/${projectId}/boxItemOuts`} exact>
        <FormattedMessage {...messages.BoxItemOuts} />
        <Label
          circular
          color={
            project.getIn(['itemsBox', 'total'], 0) !==
            project.getIn(['boxItemOuts', 'total'], 0)
              ? 'yellow'
              : 'green'
          }
        >
          {project.getIn(['boxItemOuts', 'total'], 0)}
        </Label>
      </Menu.Item>
      <Menu.Item as={NavLink} to={`/project/${projectId}/stores`} exact>
        <FormattedMessage {...messages.Stores} />
        <Label circular color="green">
          {project.getIn(['stores', 'total'], 0)}
        </Label>
      </Menu.Item>
      <Menu.Item header>
        <FormattedMessage {...messages.ImportExportFiles} />
      </Menu.Item>
      <Menu.Item as={NavLink} to={`/project/${projectId}/import`} exact>
        <FormattedMessage {...messages.ImportFiles} />
      </Menu.Item>

      {projectImportsProcessingDataIs && (
        <Menu.Header className="p-15">
          <Progress
            size="tiny"
            percent={projectImportsProcessingData.percent}
            indicating
          >
            {projectImportsProcessingData.countProcesses} /{' '}
            {projectImportsProcessingData.countTotal} /{' '}
            {projectImportsProcessingData.countCompleted}:{' '}
            {projectImportsProcessingData.percent.toFixed(0)}%
          </Progress>
        </Menu.Header>
      )}

      <Menu.Item as={NavLink} to={`/project/${projectId}/export`} exact>
        <FormattedMessage {...messages.ExportFiles} />
      </Menu.Item>
    </React.Fragment>
  );
}

function ProjectMenu({
  projectId,
  project,
  currentUser,
  projectImportsProcessingData,
}) {
  const isCurrentIsOwner =
    project &&
    currentUser &&
    currentUser.get('id') === project.getIn(['owner', 'id']);

  return (
    <Aside vertical>
      <Menu.Item header>
        <FormattedMessage {...messages.General} />
      </Menu.Item>
      <Menu.Item as={NavLink} to={`/project/${projectId}`} exact>
        <FormattedMessage {...messages.Dashboard} />
      </Menu.Item>
      <Menu.Item as={NavLink} to={`/project/${projectId}/contributors`} exact>
        <FormattedMessage {...messages.Contributors} />
      </Menu.Item>
      {isCurrentIsOwner && (
        <ProjectMenuIsOwnerItems
          projectId={projectId}
          project={project}
          currentUser={currentUser}
          projectImportsProcessingData={projectImportsProcessingData}
        />
      )}
    </Aside>
  );
}

ProjectMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  projectId: PropTypes.string.isRequired,
  project: PropTypes.instanceOf(Map),
  currentUser: PropTypes.instanceOf(Map),
  projectImportsProcessingData: PropTypes.shape({
    isProcessing: PropTypes.bool.isRequired,
    countTotal: PropTypes.number.isRequired,
    countCompleted: PropTypes.number.isRequired,
    countProcesses: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
};

ProjectMenu.defaultProps = {
  project: null,
  currentUser: null,
};

export default ProjectMenu;

const Aside = styled(Menu)`
  height: calc(100vh - 78.5px);
  overflow-y: auto;
`;
