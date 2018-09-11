/**
 *
 * ProjectImportPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import styled from 'styled-components';
import cx from 'classnames';
import { remote } from 'electron';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import makeSelectProjectImportPage, { makeSelectProject } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { changeId } from './actions';
import { CLIENT_FILES, FILES, SERVER_FILES } from '../../utils/gameFiles';

import {
  makeSelectIsLoggedIn,
  makeSelectCurrentUser,
  makeSelectProjectsImports,
  makeSelectProjectsImportsProcessingData,
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
import Notification from '../../components/Notification';
import LoadingIndicator from '../../components/LoadingIndicator';
import ProjectMenu from '../../components/ProjectMenu';
import Button from '../../components/Button';

/* eslint-disable react/prefer-stateless-function */
export class ProjectImportPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderFiles = this.renderFiles.bind(this);
    this.onClickSelectFilePath = this.onClickSelectFilePath.bind(this);
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

  renderFiles(files = {}) {
    const {
      fnProjectsImportsChangeFilePropValue,
      projectsImports,
      projectImportPage,
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
        });

      /* eslint-disable react/jsx-no-bind */
      /* TODO: move this to another pure component  */
      const onClickSelectFilePath = this.onClickSelectFilePath.bind(null, key);

      return (
        <FileRow key={key}>
          <div className="overlay" />
          <div className="file-actions">
            <span className="tag is-pulled-right is-small file-status-tag">
              {fileStatus}
            </span>

            <div className="import-type">
              <div className="field">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={fileState.get('importType') === REPLACE}
                    onChange={evt =>
                      fileActions.changeImportType(
                        evt.target.checked ? REPLACE : SKIP,
                      )
                    }
                    value={1}
                  />
                  <FormattedMessage {...messages.RewriteItems} />
                </label>
              </div>
            </div>

            <Button
              className="is-small is-primary"
              onClick={onClickSelectFilePath}
            >
              <i className="fas fa-hand-pointer" />
              &nbsp;
              <FormattedMessage {...messages.SelectFile} />
            </Button>

            {filePath && (
              <React.Fragment>
                &nbsp;
                <Button
                  className="is-small"
                  onClick={() => fileActions.changeFilePath('')}
                >
                  <i className="fas fa-times" />
                </Button>
              </React.Fragment>
            )}

            <div className="is-pulled-right">
              {filePath && (
                <Button
                  className={cx('is-small', {
                    'is-primary': fileStatus === WAITING,
                    'is-warning': fileStatus === PROCESSING,
                  })}
                  onClick={onClickStart}
                >
                  <i
                    className={cx('fas', {
                      'fa-play': fileStatus === WAITING,
                      'fa-times': fileStatus === PROCESSING,
                    })}
                  />
                  &nbsp;
                  {fileStatus !== PROCESSING && (
                    <FormattedMessage {...messages.Start} />
                  )}
                  {fileStatus === PROCESSING && (
                    <FormattedMessage {...messages.Cancel} />
                  )}
                </Button>
              )}
            </div>
          </div>
          <div className="file-type">
            <span
              className={cx('tag', 'is-small', {
                'is-info': fileStatus === WAITING,
                'is-primary': fileStatus === PROCESSING,
                'is-success': fileStatus === FINISHED,
                'is-danger': fileStatus === ERROR,
                'is-warning': fileStatus === CANCELLED,
              })}
            >
              {fileStatus}
            </span>
          </div>
          <div className="file-title">{file.title || file.path}</div>
          <div className="is-clearfix" />
          <div className="file-selected">
            {fileStatus === PROCESSING && (
              <React.Fragment>
                <div className="message">{percent}%</div>
                <progress
                  className="progress is-small is-info"
                  value={percent}
                  max="100"
                />
              </React.Fragment>
            )}

            <code>
              {filePath.substring(
                filePath.length > 64 ? filePath.length - 64 : 0,
                filePath.length,
              ) || <FormattedMessage {...messages.nothingSelected} />}
            </code>
          </div>
        </FileRow>
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

        <div className="container is-fluid p-10">
          {isError && (
            <Notification className="is-danger">{errorMessage}</Notification>
          )}

          {isLoading && <LoadingIndicator />}

          {isLoaded && (
            <div className="columns">
              <div className="column is-2">
                <ProjectMenu
                  isLoggedIn={isLoggedIn}
                  project={currentProject}
                  projectId={id}
                  currentUser={currentUser}
                />
              </div>
              <div className="column">
                <p className="title is-4">
                  <FormattedMessage
                    {...messages.header}
                    values={{ title: project.title }}
                  />
                </p>

                <div className="columns">
                  <div className="column">
                    <p className="title is-6">
                      <FormattedMessage {...messages.ClientFiles} />
                    </p>

                    <div className="card">
                      {this.renderFiles(CLIENT_FILES)}
                      <pre>
                        <span className="has-text-link">
                          <FormattedMessage {...messages.clientHelpMessage} />
                        </span>
                      </pre>
                    </div>
                  </div>
                  <div className="column">
                    <p className="title is-6">
                      <FormattedMessage {...messages.ServerFiles} />
                    </p>

                    <div className="card">{this.renderFiles(SERVER_FILES)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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
  projectsImports: makeSelectProjectsImports(),
  projectsImportsProcessingData: makeSelectProjectsImportsProcessingData(),
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

const FileRow = styled.div`
  overflow: hidden;
  padding: 10px;
  position: relative;

  .file-actions,
  .overlay {
    visible: hidden;
    background: rgba(0, 0, 0, 0.9);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 3;
    opacity: 0;
    transition: all 0.1s ease;
  }

  .file-actions {
    background: transparent;
    color: #fff;
    padding: 10px;
    .checkbox:hover {
      color: #f1f1f1;
    }
    .field {
      margin-bottom: 5px;
    }
    .file-status-tag {
      font-size: 11px;
      line-height: 11px;
      height: auto;
    }
  }

  &:hover {
    background: #ddd;
    .overlay {
      visible: normal;
      opacity: 1;
    }
    .file-actions {
      visible: normal;
      opacity: 1;
    }
  }

  .file-type,
  .file-title,
  .file-selected {
    float: left;
    margin-right: 5px;
  }

  .file-title {
    position: relative;
    top: 2px;
  }

  .file-selected {
    margin-right: 0;
    float: none;
    margin-top: 5px;
    position: relative;
    code {
      font-size: 11px;
      display: block;
    }

    .progress {
      margin: 0;
      position: absolute;
      min-height: 21px;
      border-radius: 0;
      left: 0;
      top: 0;
      opacity: 0.9;
      z-index: 1;
    }

    .message {
      position: absolute;
      width: 100%;
      text-align: center;
      color: black;
      z-index: 2;
      background: transparent;
    }
  }
`;
