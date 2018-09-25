/**
 *
 * ProjectImportPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { map, forEach, some } from 'lodash';
import styled from 'styled-components';
import cx from 'classnames';
import { remote } from 'electron';
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
  Select,
} from 'semantic-ui-react';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import makeSelectProjectImportPage, {
  makeSelectProject,
  makeSelectImportType,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { changeId, changeImportType } from './actions';
import { CLIENT_FILES, FILES, SERVER_FILES } from '../../utils/gameFiles';

import {
  makeSelectIsLoggedIn,
  makeSelectCurrentUser,
  makeSelectProjectsImports,
  makeSelectProjectsImportsProcessingData,
  makeSelectProjectImportsProcessingData,
} from '../App/selectors';

import {
  logoutCurrentUser,
  projectsImportsBindActionsWithFileKey,
  projectsImportsStartFileImport,
  projectsImportsCancelFileImport,
} from '../App/actions';

import {
  REPLACE,
  SKIP,
  WAITING,
  PROCESSING,
  FINISHED,
  ERROR,
  CANCELLED,
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
export class ProjectImportPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderFiles = this.renderFiles.bind(this);
    this.onClickSelectFilePath = this.onClickSelectFilePath.bind(this);
    this.onClickStartAll = this.onClickStartAll.bind(this);
    this.onClickCancelAll = this.onClickCancelAll.bind(this);
    this.isSomeStarted = this.isSomeStarted.bind(this);
    this.isSomeReadyToStart = this.isSomeReadyToStart.bind(this);
  }

  componentWillMount() {
    this.loadProjectIfIdChanged(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadProjectIfIdChanged(nextProps);
  }

  loadProjectIfIdChanged(props) {
    const { id } = props.projectImportPage;
    const { match } = props;
    const { params } = match;

    const nextId = params.id;

    if (id !== nextId) {
      props.fnChangeId(nextId);
    }
  }

  onClickSelectFilePath(fileKey) {
    const { fnProjectsImportsChangeFilePropValue } = this.props;
    const fileActions = fnProjectsImportsChangeFilePropValue[fileKey];

    const fileData = FILES[fileKey];
    const title = fileData.title || fileData.path;
    const extensions = fileData.extensions || [];
    const defaultPath = fileData.path || '';

    remote.dialog.showOpenDialog(
      {
        properties: ['openFile'],
        title,
        defaultPath,
        filters: [
          {
            name: extensions.map(ext => `.${ext}`).join(', '),
            extensions,
          },
          { name: 'All Files', extensions: ['*'] },
        ],
      },
      filePaths => {
        if (filePaths && filePaths.length >= 1) {
          const [filePath] = filePaths;
          fileActions.changeFilePath(filePath);
        }
      },
    );
  }

  isSomeStarted() {
    const { projectsImports, projectImportPage } = this.props;
    const { project } = projectImportPage;
    const projectImports = projectsImports.get(project.id, Map({}));

    return some(FILES, (file, key) => {
      const fileState = projectImports.get(key, Map({}));
      const fileStatus = fileState.get('status', WAITING);
      return fileStatus === PROCESSING;
    });
  }

  isSomeReadyToStart() {
    const { projectsImports, projectImportPage } = this.props;
    const { project } = projectImportPage;
    const projectImports = projectsImports.get(project.id, Map({}));

    return some(FILES, (file, key) => {
      const fileState = projectImports.get(key, Map({}));
      const fileStatus = fileState.get('status', WAITING);
      const filePath = fileState.get('filePath', '').trim();
      return fileStatus !== PROCESSING && filePath;
    });
  }

  onClickStartAll() {
    const {
      projectsImports,
      fnProjectsImportsStartFileImport,
      projectImportPage,
      importType,
    } = this.props;

    const { project } = projectImportPage;
    const projectImports = projectsImports.get(project.id, Map({}));

    forEach(FILES, (file, key) => {
      const fileState = projectImports.get(key, Map({}));
      const fileStatus = fileState.get('status', WAITING);
      const filePath = fileState.get('filePath', '').trim();

      if (fileStatus !== PROCESSING && filePath) {
        fnProjectsImportsStartFileImport({
          projectId: project.id,
          fileKey: key,
          importType,
        });
      }
    });
  }

  onClickCancelAll() {
    const {
      projectsImports,
      fnProjectsImportsCancelFileImport,
      projectImportPage,
    } = this.props;

    const { project } = projectImportPage;
    const projectImports = projectsImports.get(project.id, Map({}));

    forEach(FILES, (file, key) => {
      const fileState = projectImports.get(key, Map({}));
      const fileStatus = fileState.get('status', WAITING);

      if (fileStatus === PROCESSING) {
        fnProjectsImportsCancelFileImport({
          projectId: project.id,
          fileKey: key,
        });
      }
    });
  }

  renderFiles(files = {}) {
    const {
      fnProjectsImportsChangeFilePropValue,
      projectsImports,
      projectImportPage,
      importType,
      fnProjectsImportsStartFileImport,
      fnProjectsImportsCancelFileImport,
    } = this.props;

    const startActions = {
      fnProjectsImportsStartFileImport,
      fnProjectsImportsCancelFileImport,
    };

    const { project } = projectImportPage;
    const projectImports = projectsImports.get(project.id, Map({}));

    return map(files, (file, key) => {
      const fileActions = fnProjectsImportsChangeFilePropValue[key];
      const fileState = projectImports.get(key, Map({}));
      const filePath = fileState.get('filePath', '').trim();
      const fileStatus = fileState.get('status', WAITING);
      const fileErrorMessage = fileState.get('errorMessage', '');
      const countTotal = fileState.get('countTotal', 0);
      const countCompleted = fileState.get('countCompleted', 0);
      const percent = (() => {
        if (countTotal <= 0) return 0;
        if (countCompleted >= countTotal) return 100;
        return ((countCompleted / countTotal) * 100).toFixed(1);
      })();

      const onClickStartAction =
        fileStatus !== PROCESSING
          ? 'fnProjectsImportsStartFileImport'
          : 'fnProjectsImportsCancelFileImport';

      const onClickStart = () =>
        startActions[onClickStartAction]({
          projectId: project.id,
          fileKey: key,
          importType,
        });

      /* eslint-disable react/jsx-no-bind */
      /* TODO: move this to another pure component  */
      const onClickSelectFilePath = this.onClickSelectFilePath.bind(null, key);

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

            <Comment.Text>
              <code>
                {filePath.substring(
                  filePath.length > 64 ? filePath.length - 64 : 0,
                  filePath.length,
                ) || <FormattedMessage {...messages.nothingSelected} />}
              </code>
            </Comment.Text>
            {fileStatus === ERROR && (
              <Comment.Text>
                <Notification type="danger">{fileErrorMessage}</Notification>
              </Comment.Text>
            )}
            {fileStatus === PROCESSING && (
              <Comment.Text>
                <Progress size="tiny" percent={percent} indicating>
                  {percent}%
                </Progress>
              </Comment.Text>
            )}
            <Comment.Actions>
              <Comment.Action onClick={onClickSelectFilePath}>
                <Icon name="hand pointer" />
                <FormattedMessage {...messages.SelectFile} />
              </Comment.Action>
              {filePath && (
                <Comment.Action onClick={() => fileActions.changeFilePath('')}>
                  <Icon name="times" />
                </Comment.Action>
              )}
              <Comment.Action
                onClick={() =>
                  fileActions.changeImportType(
                    fileState.get('importType', importType) === REPLACE
                      ? SKIP
                      : REPLACE,
                  )
                }
              >
                {fileState.get('importType', importType) === REPLACE ? (
                  <FormattedMessage {...messages.RewriteItems} />
                ) : (
                  <FormattedMessage {...messages.SkipItems} />
                )}
              </Comment.Action>
              {filePath && (
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
              )}
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
      projectImportPage,
      fnLogoutCurrentUser,
      projectsImportsProcessingData,
      importType,
      fnChangeImportType,
      projectImportsProcessingData,
    } = this.props;

    const {
      project,
      isLoaded,
      isError,
      errorMessage,
      isLoading,
      id,
    } = projectImportPage;

    return (
      <div>
        <Helmet>
          <title>ProjectImportPage</title>
          <meta name="description" content="Description of ProjectImportPage" />
        </Helmet>

        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          currentProject={currentProject}
          onClickLogout={fnLogoutCurrentUser}
          projectsImportsProcessingData={projectsImportsProcessingData}
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
                  projectImportsProcessingData={projectImportsProcessingData}
                />
              </Grid.Column>
              <FullheightColumn largeScreen={13} widescreen={14}>
                <PageHeader>
                  <FormattedMessage
                    {...messages.header}
                    values={{ title: project.title }}
                  />
                </PageHeader>

                <FullheightThis>
                  <FullheightAutoSizer>
                    <Grid columns={2}>
                      <Grid.Column>
                        <PageHeader>
                          <FormattedMessage {...messages.ClientFiles} />
                        </PageHeader>

                        <SegmentComments>
                          <Comment.Group>
                            {this.renderFiles(CLIENT_FILES)}
                          </Comment.Group>
                        </SegmentComments>
                        <Segment>
                          <FormattedMessage {...messages.clientHelpMessage} />
                        </Segment>

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

                        <Select
                          value={importType}
                          onChange={fnChangeImportType}
                          options={[
                            {
                              key: SKIP,
                              value: SKIP,
                              text: (
                                <FormattedMessage {...messages.SkipItems} />
                              ),
                            },
                            {
                              key: REPLACE,
                              value: REPLACE,
                              text: (
                                <FormattedMessage {...messages.RewriteItems} />
                              ),
                            },
                          ]}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <PageHeader>
                          <FormattedMessage {...messages.ServerFiles} />
                        </PageHeader>
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

ProjectImportPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fnChangeId: PropTypes.func.isRequired,
  fnLogoutCurrentUser: PropTypes.func.isRequired,
  projectImportPage: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  currentProject: PropTypes.instanceOf(Map),
  currentUser: PropTypes.instanceOf(Map),
  importType: PropTypes.oneOf([SKIP, REPLACE]).isRequired,
};

ProjectImportPage.defaultProps = {
  currentProject: null,
  currentUser: null,
};

const mapStateToProps = createStructuredSelector({
  projectImportPage: makeSelectProjectImportPage(),
  isLoggedIn: makeSelectIsLoggedIn(),
  currentProject: makeSelectProject(),
  currentUser: makeSelectCurrentUser(),
  importType: makeSelectImportType(),
  projectsImports: makeSelectProjectsImports(),
  projectsImportsProcessingData: makeSelectProjectsImportsProcessingData(),
  projectImportsProcessingData: (
    state,
    {
      match: {
        params: { id },
      },
    },
  ) => makeSelectProjectImportsProcessingData(id)(state),
});

function mapDispatchToProps(dispatch, props) {
  const projectId = props.match.params.id;
  const fnProjectsImportsChangeFilePropValue = {};
  Object.keys(FILES).forEach(fileKey => {
    fnProjectsImportsChangeFilePropValue[
      fileKey
    ] = projectsImportsBindActionsWithFileKey({ projectId, fileKey, dispatch });
  });

  return {
    dispatch,
    fnChangeId: id => dispatch(changeId(id)),
    fnLogoutCurrentUser: () => dispatch(logoutCurrentUser()),
    fnProjectsImportsStartFileImport: args =>
      dispatch(projectsImportsStartFileImport(args)),
    fnProjectsImportsCancelFileImport: args =>
      dispatch(projectsImportsCancelFileImport(args)),
    fnProjectsImportsChangeFilePropValue,
    fnChangeImportType: (evt, owns) => dispatch(changeImportType(owns.value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'projectImportPage', reducer });
const withSaga = injectSaga({ key: 'projectImportPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectImportPage);

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
