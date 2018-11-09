/**
 *
 * ProjectImportPage
 *
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Map } from 'immutable';
import { map, forEach, some } from 'lodash';
import { remote } from 'electron';
import { statSync } from 'fs';
import cx from 'classnames';
import path from 'path';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

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

import injectSaga from '~/utils/injectSaga';
import injectReducer from '~/utils/injectReducer';

import {
  CLIENT_FILES,
  FILES,
  SERVER_FILES,
  CLIENT_ND_FILES,
  SERVER_MAP_FILES,
} from '~/utils/gameFiles';

import {
  makeSelectIsLoggedIn,
  makeSelectCurrentUser,
  makeSelectProjectsImports,
  makeSelectProjectsImportsServerMaps,
  makeSelectProjectsImportsProcessingData,
  makeSelectProjectImportsProcessingData,
} from '~/containers/App/selectors';

import {
  logoutCurrentUser,
  projectsImportsBindActionsWithFileKey,
  projectsImportsStartFileImport,
  projectsImportsCancelFileImport,
  projectsImportsServerMapsBindActions,
  projectsImportsServerMapsStartMapImport,
  projectsImportsServerMapsCancelMapImport,
} from '~/containers/App/actions';

import {
  REPLACE,
  SKIP,
  WAITING,
  PROCESSING,
  FINISHED,
  ERROR,
  CANCELLED,
  IMMUTABLE_MAP,
} from '~/containers/App/constants';

import Header from '~/components/Header';
import Container from '~/components/Container';
import Notification from '~/components/Notification';
import LoadingIndicator from '~/components/LoadingIndicator';
import ProjectMenu from '~/components/ProjectMenu';

import FullheightColumn, {
  FullheightThis,
  FullheightAutoSizer,
} from '~/components/FullheightColumn';

import makeSelectProjectImportPage, {
  makeSelectProject,
  makeSelectImportType,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { changeId, changeImportType } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ProjectImportPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderFiles = this.renderFiles.bind(this);
    this.renderServerMaps = this.renderServerMaps.bind(this);
    this.onClickSelectFilePath = this.onClickSelectFilePath.bind(this);
    this.onClickStartAll = this.onClickStartAll.bind(this);
    this.onClickCancelAll = this.onClickCancelAll.bind(this);
    this.isSomeStarted = this.isSomeStarted.bind(this);
    this.isSomeReadyToStart = this.isSomeReadyToStart.bind(this);
    this.onClickSelectClientFolder = this.onClickSelectClientFolder.bind(this);
    this.onClickSelectServerFolder = this.onClickSelectServerFolder.bind(this);
    this.onClickSelectServerMapsFolders = this.onClickSelectServerMapsFolders.bind(
      this,
    );
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

  onClickSelectClientFolder() {
    const { fnProjectsImportsChangeFilePropValue } = this.props;

    remote.dialog.showOpenDialog(
      {
        properties: ['openDirectory'],
      },
      dirs => {
        try {
          const [dir] = dirs;
          if (statSync(path.resolve(dir, 'datatable'))) {
            forEach(CLIENT_FILES, (file, fileKey) => {
              const fileActions = fnProjectsImportsChangeFilePropValue[fileKey];
              fileActions.changeFilePath(path.resolve(dir, file.path));
            });
          }
        } catch (err) {
          // ignore
        }
      },
    );
  }

  onClickSelectServerFolder() {
    const { fnProjectsImportsChangeFilePropValue } = this.props;

    remote.dialog.showOpenDialog(
      {
        properties: ['openDirectory'],
      },
      dirs => {
        try {
          const [dir] = dirs;
          if (statSync(path.resolve(dir, 'script'))) {
            forEach(SERVER_FILES, (file, fileKey) => {
              const fileActions = fnProjectsImportsChangeFilePropValue[fileKey];
              fileActions.changeFilePath(path.resolve(dir, file.path));
            });
          }
        } catch (err) {
          // ignore
        }
      },
    );
  }

  onClickSelectServerMapsFolders() {
    const { fnProjectImportsServerMapsActions } = this.props;

    remote.dialog.showOpenDialog(
      {
        properties: ['openDirectory', 'multiSelections'],
      },
      dirs => {
        try {
          dirs.forEach(dir => {
            const mapName = path.parse(dir).name;
            if (!mapName) {
              return;
            }

            fnProjectImportsServerMapsActions.add(mapName, dir);
          });
        } catch (err) {
          // ignore
        }
      },
    );
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
    const {
      projectsImports,
      projectImportPage,
      projectsImportsServerMaps,
    } = this.props;

    const { project } = projectImportPage;

    const projectImports = projectsImports.get(project.id, IMMUTABLE_MAP);
    const serverMaps = projectsImportsServerMaps.get(project.id, IMMUTABLE_MAP);

    return (
      some(FILES, (file, key) => {
        const fileState = projectImports.get(key, IMMUTABLE_MAP);
        const fileStatus = fileState.get('status', WAITING);
        return fileStatus === PROCESSING;
      }) ||
      serverMaps.some(
        serverMap => serverMap.get('status', WAITING) === PROCESSING,
      )
    );
  }

  isSomeReadyToStart() {
    const {
      projectsImports,
      projectImportPage,
      projectsImportsServerMaps,
    } = this.props;

    const { project } = projectImportPage;
    const projectImports = projectsImports.get(project.id, IMMUTABLE_MAP);
    const serverMaps = projectsImportsServerMaps.get(project.id, IMMUTABLE_MAP);

    return (
      some(FILES, (file, key) => {
        const fileState = projectImports.get(key, IMMUTABLE_MAP);
        const fileStatus = fileState.get('status', WAITING);
        const filePath = fileState.get('filePath', '').trim();
        return fileStatus !== PROCESSING && filePath;
      }) ||
      serverMaps.some(
        serverMap => serverMap.get('status', WAITING) !== PROCESSING,
      )
    );
  }

  onClickStartAll() {
    const {
      projectsImports,
      fnProjectsImportsStartFileImport,
      projectImportPage,
      importType,
      projectsImportsServerMaps,
      fnProjectsImportsServerMapsStartMapImport,
    } = this.props;

    const { project } = projectImportPage;
    const projectImports = projectsImports.get(project.id, IMMUTABLE_MAP);
    const serverMaps = projectsImportsServerMaps.get(project.id, IMMUTABLE_MAP);

    forEach(FILES, (file, key) => {
      const fileState = projectImports.get(key, IMMUTABLE_MAP);
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

    serverMaps.forEach(serverMap => {
      if (serverMap.get('status', WAITING) !== PROCESSING) {
        fnProjectsImportsServerMapsStartMapImport({
          projectId: project.id,
          mapName: serverMap.get('mapName'),
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
      projectsImportsServerMaps,
      fnProjectsImportsServerMapsCancelMapImport,
    } = this.props;

    const { project } = projectImportPage;
    const projectImports = projectsImports.get(project.id, IMMUTABLE_MAP);
    const serverMaps = projectsImportsServerMaps.get(project.id, IMMUTABLE_MAP);

    forEach(FILES, (file, key) => {
      const fileState = projectImports.get(key, IMMUTABLE_MAP);
      const fileStatus = fileState.get('status', WAITING);

      if (fileStatus === PROCESSING) {
        fnProjectsImportsCancelFileImport({
          projectId: project.id,
          fileKey: key,
        });
      }
    });

    serverMaps.forEach(serverMap => {
      if (serverMap.get('status', WAITING) === PROCESSING) {
        fnProjectsImportsServerMapsCancelMapImport({
          projectId: project.id,
          mapName: serverMap.get('mapName'),
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
    const projectImports = projectsImports.get(project.id, IMMUTABLE_MAP);

    const fileKeys = Object.keys(files).sort();

    return map(fileKeys, key => {
      const file = files[key];
      const fileActions = fnProjectsImportsChangeFilePropValue[key];
      const fileState = projectImports.get(key, IMMUTABLE_MAP);
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

  renderServerMaps(serverMaps = IMMUTABLE_MAP) {
    const {
      importType,
      fnProjectImportsServerMapsActions,
      fnProjectsImportsServerMapsStartMapImport,
      fnProjectsImportsServerMapsCancelMapImport,
    } = this.props;

    const startActions = {
      fnProjectsImportsServerMapsStartMapImport,
      fnProjectsImportsServerMapsCancelMapImport,
    };

    return map(serverMaps.toJS(), (serverMap, mapName) => {
      const state = serverMaps.get(mapName, IMMUTABLE_MAP);
      const status = state.get('status', WAITING);
      const message = state.get('message', '');
      const mapPath = state.get('mapPath', '');
      const errorMessage = state.get('errorMessage', '');
      const countTotal = state.get('countTotal', 0);
      const countCompleted = state.get('countCompleted', 0);

      const percent = (() => {
        if (countTotal <= 0) return 0;
        if (countCompleted >= countTotal) return 100;
        return ((countCompleted / countTotal) * 100).toFixed(1);
      })();

      const blockImportType = state.get('importType', importType);
      const blockChangeImportType = value =>
        fnProjectImportsServerMapsActions.changeImportType(mapName, value);
      const blockRemove = () =>
        fnProjectImportsServerMapsActions.remove(mapName);

      const onClickStartAction =
        status !== PROCESSING
          ? 'fnProjectsImportsServerMapsStartMapImport'
          : 'fnProjectsImportsServerMapsCancelMapImport';

      const onClickStart = () =>
        startActions[onClickStartAction]({
          projectId: state.get('projectId'),
          mapName,
          importType,
        });

      return (
        <Comment key={mapName}>
          <Comment.Content>
            <Comment.Author>
              <Label
                horizontal
                color={cx({
                  teal: status === WAITING,
                  purple: status === PROCESSING,
                  green: status === FINISHED,
                  red: status === ERROR,
                  yellow: status === CANCELLED,
                })}
              >
                {status}
              </Label>
              {mapName}
            </Comment.Author>

            <Comment.Text>
              <code>
                {mapPath.substring(
                  mapPath.length > 64 ? mapPath.length - 64 : 0,
                  mapPath.length,
                )}
              </code>
            </Comment.Text>
            {message && <Comment.Text>{message}</Comment.Text>}
            {status === ERROR && (
              <Comment.Text>
                <Notification type="danger">{errorMessage}</Notification>
              </Comment.Text>
            )}
            {status === PROCESSING && (
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
                      status,
                    ),
                    times: status === PROCESSING,
                  })}
                />
                {status !== PROCESSING && (
                  <FormattedMessage {...messages.Start} />
                )}
                {status === PROCESSING && (
                  <FormattedMessage {...messages.Cancel} />
                )}
              </Comment.Action>
              <Comment.Action onClick={blockRemove}>
                <Icon name="times" />
              </Comment.Action>
              <Comment.Action
                onClick={() =>
                  blockChangeImportType(
                    blockImportType === REPLACE ? SKIP : REPLACE,
                  )
                }
              >
                {blockImportType === REPLACE ? (
                  <FormattedMessage {...messages.RewriteItems} />
                ) : (
                  <FormattedMessage {...messages.SkipItems} />
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
      projectImportPage,
      fnLogoutCurrentUser,
      projectsImportsProcessingData,
      importType,
      fnChangeImportType,
      projectImportsProcessingData,
      projectsImportsServerMaps,
    } = this.props;

    const {
      project,
      isLoaded,
      isError,
      errorMessage,
      isLoading,
      id,
    } = projectImportPage;

    const serverMaps = projectsImportsServerMaps.get(id, IMMUTABLE_MAP);

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

                    <Select
                      value={importType}
                      onChange={fnChangeImportType}
                      options={[
                        {
                          key: SKIP,
                          value: SKIP,
                          text: <FormattedMessage {...messages.SkipItems} />,
                        },
                        {
                          key: REPLACE,
                          value: REPLACE,
                          text: <FormattedMessage {...messages.RewriteItems} />,
                        },
                      ]}
                    />
                  </Segment>

                  <Segment floated="left" inverted>
                    <FormattedMessage {...messages.clientHelpMessage} />
                  </Segment>
                </div>

                <FullheightThis>
                  <FullheightAutoSizer>
                    <Grid columns={2}>
                      <Grid.Column>
                        <PageHeader>
                          <FormattedMessage {...messages.ClientFiles} />
                        </PageHeader>
                        <Button
                          size="mini"
                          onClick={this.onClickSelectClientFolder}
                        >
                          <FormattedMessage {...messages.SelectFolder} />
                        </Button>
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

                        <PageHeader>
                          <FormattedMessage {...messages.ServerMapFiles} />
                        </PageHeader>
                        <SegmentComments>
                          <Comment.Group>
                            {this.renderFiles(SERVER_MAP_FILES)}
                          </Comment.Group>
                        </SegmentComments>

                        <Button
                          size="mini"
                          onClick={this.onClickSelectServerMapsFolders}
                        >
                          <FormattedMessage {...messages.SelectMaps} />
                        </Button>
                        {serverMaps.count() > 0 && (
                          <SegmentComments>
                            <Comment.Group>
                              {this.renderServerMaps(serverMaps)}
                            </Comment.Group>
                          </SegmentComments>
                        )}
                      </Grid.Column>
                      <Grid.Column>
                        <PageHeader>
                          <FormattedMessage {...messages.ServerFiles} />
                        </PageHeader>
                        <Button
                          size="mini"
                          onClick={this.onClickSelectServerFolder}
                        >
                          <FormattedMessage {...messages.SelectFolder} />
                        </Button>
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
  projectsImportsServerMaps: makeSelectProjectsImportsServerMaps(),
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

    fnProjectsImportsServerMapsStartMapImport: args =>
      dispatch(projectsImportsServerMapsStartMapImport(args)),
    fnProjectsImportsServerMapsCancelMapImport: args =>
      dispatch(projectsImportsServerMapsCancelMapImport(args)),

    fnProjectsImportsChangeFilePropValue,
    fnChangeImportType: (evt, owns) => dispatch(changeImportType(owns.value)),
    fnProjectImportsServerMapsActions: projectsImportsServerMapsBindActions({
      projectId,
      dispatch,
    }),
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
