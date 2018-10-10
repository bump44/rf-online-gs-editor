/**
 *
 * ProjectExportPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { map, some, forEach } from 'lodash';
import styled from 'styled-components';
import cx from 'classnames';
import { remote } from 'electron';
import { statSync } from 'fs';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Grid,
  Header as PageHeader,
  Segment,
  Label,
  Comment,
  Progress,
  Icon,
  Button,
} from 'semantic-ui-react';

import { getReleaseFilesPath } from '../../utils/path';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import makeSelectProjectExportPage, { makeSelectProject } from './selectors';
import { changeId } from './actions';

import {
  CLIENT_FILES,
  FILES,
  SERVER_FILES,
  CLIENT_ND_FILES,
} from '../../utils/gameFiles';

import {
  makeSelectIsLoggedIn,
  makeSelectCurrentUser,
  makeSelectProjectsExports,
} from '../App/selectors';

import {
  logoutCurrentUser,
  projectsExportsBindActionsWithFileKey,
  projectsExportsStartFileExport,
  projectsExportsCancelFileExport,
} from '../App/actions';

import {
  WAITING,
  PROCESSING,
  FINISHED,
  ERROR,
  CANCELLED,
  IMMUTABLE_MAP,
} from '../App/constants';

import Header from '../../components/Header';
import Container from '../../components/Container';
import Notification from '../../components/Notification';
import LoadingIndicator from '../../components/LoadingIndicator';
import ProjectMenu from '../../components/ProjectMenu';
import FullheightColumn, {
  FullheightThis,
  FullheightAutoSizer,
} from '../../components/FullheightColumn';

/* eslint-disable react/prefer-stateless-function */
export class ProjectExportPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderFiles = this.renderFiles.bind(this);
    this.onClickStartAll = this.onClickStartAll.bind(this);
    this.onClickCancelAll = this.onClickCancelAll.bind(this);
    this.isSomeStarted = this.isSomeStarted.bind(this);
    this.isSomeReadyToStart = this.isSomeReadyToStart.bind(this);
    this.onClickOpenReleaseFolder = this.onClickOpenReleaseFolder.bind(this);
  }

  componentWillMount() {
    this.loadProjectIfIdChanged(this.props, { isMount: true });
  }

  componentWillReceiveProps(nextProps) {
    this.loadProjectIfIdChanged(nextProps);
  }

  loadProjectIfIdChanged(props, { isMount = false } = {}) {
    const { id } = props.projectExportPage;
    const { match } = props;
    const { params } = match;

    const nextId = params.id;

    if (id !== nextId || isMount) {
      props.fnChangeId(nextId);
    }
  }

  isSomeStarted() {
    const { projectsExports, projectExportPage } = this.props;
    const { project } = projectExportPage;
    const projectExports = projectsExports.get(project.id, IMMUTABLE_MAP);

    return some(FILES, (file, key) => {
      const fileState = projectExports.get(key, IMMUTABLE_MAP);
      const fileStatus = fileState.get('status', WAITING);
      return fileStatus === PROCESSING;
    });
  }

  isSomeReadyToStart() {
    const { projectsExports, projectExportPage } = this.props;
    const { project } = projectExportPage;
    const projectExports = projectsExports.get(project.id, IMMUTABLE_MAP);

    return some(FILES, (file, key) => {
      const fileState = projectExports.get(key, IMMUTABLE_MAP);
      const fileStatus = fileState.get('status', WAITING);
      return fileStatus !== PROCESSING;
    });
  }

  onClickOpenReleaseFolder() {
    const { projectExportPage } = this.props;
    const { project } = projectExportPage;

    try {
      if (statSync(getReleaseFilesPath(project.id))) {
        remote.shell.openItem(getReleaseFilesPath(project.id));
      }
    } catch (err) {
      remote.dialog.showErrorBox('Release', 'Not found');
    }
  }

  onClickStartAll() {
    const {
      projectsExports,
      fnProjectsExportsStartFileExport,
      projectExportPage,
    } = this.props;

    const { project } = projectExportPage;
    const projectExports = projectsExports.get(project.id, IMMUTABLE_MAP);

    forEach(FILES, (file, key) => {
      const fileState = projectExports.get(key, IMMUTABLE_MAP);
      const fileStatus = fileState.get('status', WAITING);

      if (fileStatus !== PROCESSING) {
        fnProjectsExportsStartFileExport({
          projectId: project.id,
          fileKey: key,
        });
      }
    });
  }

  onClickCancelAll() {
    const {
      projectsExports,
      fnProjectsExportsCancelFileExport,
      projectExportPage,
    } = this.props;

    const { project } = projectExportPage;
    const projectExports = projectsExports.get(project.id, IMMUTABLE_MAP);

    forEach(FILES, (file, key) => {
      const fileState = projectExports.get(key, IMMUTABLE_MAP);
      const fileStatus = fileState.get('status', WAITING);

      if (fileStatus === PROCESSING) {
        fnProjectsExportsCancelFileExport({
          projectId: project.id,
          fileKey: key,
        });
      }
    });
  }

  renderFiles(files = {}) {
    const {
      // fnProjectsExportsChangeFilePropValue,
      projectsExports,
      projectExportPage,
      fnProjectsExportsStartFileExport,
      fnProjectsExportsCancelFileExport,
    } = this.props;

    const startActions = {
      fnProjectsExportsStartFileExport,
      fnProjectsExportsCancelFileExport,
    };

    const { project } = projectExportPage;
    const projectExports = projectsExports.get(project.id, IMMUTABLE_MAP);

    return map(files, (file, key) => {
      // const fileActions = fnProjectsExportsChangeFilePropValue[key];
      const fileState = projectExports.get(key, IMMUTABLE_MAP);
      const fileStatus = fileState.get('status', WAITING);
      const fileErrorMessage = fileState.get('errorMessage', '');
      const total = fileState.get('total', 0);
      const loaded = fileState.get('loaded', 0);

      const percent = (() => {
        if (total <= 0) return 0;
        if (loaded >= total) return 100;
        return ((loaded / total) * 100).toFixed(1);
      })();

      const onClickStartAction =
        fileStatus !== PROCESSING
          ? 'fnProjectsExportsStartFileExport'
          : 'fnProjectsExportsCancelFileExport';

      const onClickStart = () =>
        startActions[onClickStartAction]({
          projectId: project.id,
          fileKey: key,
        });

      return (
        <Comment key={key}>
          <Comment.Content>
            <Comment.Author>
              <Label
                horizontal
                color={cx({
                  teal: fileStatus === WAITING,
                  purple: fileStatus === PROCESSING,
                  green: fileStatus === FINISHED,
                  red: fileStatus === ERROR,
                  yellow: fileStatus === CANCELLED,
                })}
              >
                {fileStatus}
              </Label>
              {file.title || file.path}
            </Comment.Author>

            {fileStatus === ERROR && (
              <Comment.Text>
                <Notification type="danger">{fileErrorMessage}</Notification>
              </Comment.Text>
            )}
            <Comment.Text />
            {fileStatus === PROCESSING && (
              <Comment.Text>
                <Progress size="tiny" percent={percent} indicating>
                  {percent}%
                </Progress>
              </Comment.Text>
            )}
            <Comment.Actions>
              <Comment.Action onClick={onClickStart}>
                <Icon
                  name={cx({
                    play: [WAITING, FINISHED, CANCELLED, ERROR].includes(
                      fileStatus,
                    ),
                    times: fileStatus === PROCESSING,
                  })}
                />
                {fileStatus !== PROCESSING && (
                  <FormattedMessage {...messages.Start} />
                )}
                {fileStatus === PROCESSING && (
                  <FormattedMessage {...messages.Cancel} />
                )}
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      );
    });
  }

  render() {
    const {
      isLoggedIn,
      currentUser,
      currentProject,
      projectExportPage,
      fnLogoutCurrentUser,
      projectsExportsProcessingData,
      projectExportsProcessingData,
    } = this.props;

    const {
      project,
      isLoaded,
      isError,
      errorMessage,
      isLoading,
      id,
    } = projectExportPage;

    return (
      <div>
        <Helmet>
          <title>ProjectExportPage</title>
          <meta name="description" content="Description of ProjectExportPage" />
        </Helmet>

        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          currentProject={currentProject}
          onClickLogout={fnLogoutCurrentUser}
          projectsExportsProcessingData={projectsExportsProcessingData}
        />

        <Container>
          {isError && (
            <Notification className="is-danger">{errorMessage}</Notification>
          )}

          {isLoading && <LoadingIndicator />}

          {isLoaded && (
            <Grid columns={2}>
              <Grid.Column largeScreen={3} widescreen={2}>
                <ProjectMenu
                  isLoggedIn={isLoggedIn}
                  project={currentProject}
                  projectId={id}
                  currentUser={currentUser}
                  projectExportsProcessingData={projectExportsProcessingData}
                />
              </Grid.Column>
              <FullheightColumn largeScreen={13} widescreen={14}>
                <PageHeader>
                  <FormattedMessage
                    {...messages.header}
                    values={{ title: project.title }}
                  />
                </PageHeader>

                <div>
                  <Segment floated="left">
                    <Button
                      primary
                      onClick={this.onClickStartAll}
                      disabled={!this.isSomeReadyToStart()}
                    >
                      <Icon name="play" />
                      <FormattedMessage {...messages.Start} />
                    </Button>

                    <Button
                      secondary
                      onClick={this.onClickCancelAll}
                      disabled={!this.isSomeStarted()}
                    >
                      <Icon name="stop" />
                      <FormattedMessage {...messages.Cancel} />
                    </Button>

                    <Button secondary onClick={this.onClickOpenReleaseFolder}>
                      <FormattedMessage {...messages.OpenReleaseFolder} />
                    </Button>
                  </Segment>
                </div>

                <FullheightThis>
                  <FullheightAutoSizer>
                    <Grid columns={2}>
                      <Grid.Column>
                        <PageHeader>Client Files</PageHeader>

                        <SegmentComments>
                          <Comment.Group>
                            {this.renderFiles(CLIENT_FILES)}
                          </Comment.Group>
                        </SegmentComments>

                        <SegmentComments>
                          <Comment.Group>
                            {this.renderFiles(CLIENT_ND_FILES)}
                          </Comment.Group>
                        </SegmentComments>
                      </Grid.Column>
                      <Grid.Column>
                        <PageHeader>Server Files</PageHeader>
                        <SegmentComments>
                          <Comment.Group>
                            {this.renderFiles(SERVER_FILES)}
                          </Comment.Group>
                        </SegmentComments>
                      </Grid.Column>
                    </Grid>
                  </FullheightAutoSizer>
                </FullheightThis>
              </FullheightColumn>
            </Grid>
          )}
        </Container>
      </div>
    );
  }
}

ProjectExportPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fnChangeId: PropTypes.func.isRequired,
  fnLogoutCurrentUser: PropTypes.func.isRequired,
  projectExportPage: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  currentProject: PropTypes.instanceOf(Map),
  currentUser: PropTypes.instanceOf(Map),
};

ProjectExportPage.defaultProps = {
  currentProject: null,
  currentUser: null,
};

const mapStateToProps = createStructuredSelector({
  projectExportPage: makeSelectProjectExportPage(),
  isLoggedIn: makeSelectIsLoggedIn(),
  currentProject: makeSelectProject(),
  currentUser: makeSelectCurrentUser(),
  projectsExports: makeSelectProjectsExports(),
});

function mapDispatchToProps(dispatch, props) {
  const projectId = props.match.params.id;
  const fnProjectsExportsChangeFilePropValue = {};
  Object.keys(FILES).forEach(fileKey => {
    fnProjectsExportsChangeFilePropValue[
      fileKey
    ] = projectsExportsBindActionsWithFileKey({ projectId, fileKey, dispatch });
  });

  return {
    dispatch,
    fnChangeId: id => dispatch(changeId(id)),
    fnLogoutCurrentUser: () => dispatch(logoutCurrentUser()),
    fnProjectsExportsStartFileExport: args =>
      dispatch(projectsExportsStartFileExport(args)),
    fnProjectsExportsCancelFileExport: args =>
      dispatch(projectsExportsCancelFileExport(args)),
    fnProjectsExportsChangeFilePropValue,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'projectExportPage', reducer });
const withSaga = injectSaga({ key: 'projectExportPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectExportPage);

const SegmentComments = styled(Segment)`
  &.ui.segment {
    padding: 0;

    .comments {
      max-width: 100%;
    }

    .comment {
      padding: 9px;
      &:hover {
        background: #f9f9f9;
      }

      .content {
        .text {
          code {
            color: #e03997;
            font-size: 12px;
            background: #f3f3f3;
            display: block;
            padding: 3px;
            line-height: 12px;
          }
        }
      }
    }
  }
`;
