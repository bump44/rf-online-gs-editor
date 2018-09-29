/**
 *
 * ProjectPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, Header as PageHeader, Statistic } from 'semantic-ui-react';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import makeSelectProjectPage, { makeSelectProject } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { changeId } from './actions';
import {
  makeSelectIsLoggedIn,
  makeSelectCurrentUser,
  makeSelectProjectsImportsProcessingData,
} from '../App/selectors';
import Header from '../../components/Header';
import Container from '../../components/Container';
import Notification from '../../components/Notification';
import ProjectsMediaItems from '../../components/ProjectsMediaItems';
import LoadingIndicator from '../../components/LoadingIndicator';
import ProjectMenu from '../../components/ProjectMenu';
import { logoutCurrentUser } from '../App/actions';

/* eslint-disable react/prefer-stateless-function */
export class ProjectPage extends React.PureComponent {
  componentWillMount() {
    this.loadProjectIfIdChanged(this.props, { isMount: true });
  }

  componentWillReceiveProps(nextProps) {
    this.loadProjectIfIdChanged(nextProps);
  }

  loadProjectIfIdChanged(props, { isMount = false } = {}) {
    const { id } = props.projectPage;
    const { match } = props;
    const { params } = match;

    const nextId = params.id;

    if (id !== nextId || isMount) {
      props.fnChangeId(nextId);
    }
  }

  render() {
    const {
      isLoggedIn,
      currentUser,
      currentProject,
      projectPage,
      projectsImportsProcessingData,
      fnLogoutCurrentUser,
    } = this.props;

    const {
      project,
      isLoaded,
      isError,
      errorMessage,
      isLoading,
      id,
    } = projectPage;

    return (
      <div>
        <Helmet>
          <title>ProjectPage</title>
          <meta name="description" content="Description of ProjectPage" />
        </Helmet>

        <Header
          isLoggedIn={isLoggedIn}
          onClickLogout={fnLogoutCurrentUser}
          currentUser={currentUser}
          currentProject={currentProject}
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
                />
              </Grid.Column>
              <Grid.Column largeScreen={13} widescreen={14}>
                <PageHeader>
                  <FormattedMessage {...messages.header} />
                </PageHeader>
                <ProjectsMediaItems
                  items={[project]}
                  currentUser={currentUser}
                />

                <Statistic.Group>
                  <Statistic>
                    <Statistic.Value>
                      {currentProject
                        .getIn(['items', 'total'], 0)
                        .toLocaleString()}
                    </Statistic.Value>
                    <Statistic.Label>Items</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>
                      {currentProject
                        .getIn(['boxItemOuts', 'total'], 0)
                        .toLocaleString()}
                    </Statistic.Value>
                    <Statistic.Label>Box item outputs</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>
                      {currentProject
                        .getIn(['stores', 'total'], 0)
                        .toLocaleString()}
                    </Statistic.Value>
                    <Statistic.Label>Stores</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </Grid.Column>
            </Grid>
          )}
        </Container>
      </div>
    );
  }
}

ProjectPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fnChangeId: PropTypes.func.isRequired,
  projectPage: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  currentProject: PropTypes.instanceOf(Map),
  currentUser: PropTypes.instanceOf(Map),
};

ProjectPage.defaultProps = {
  currentProject: null,
  currentUser: null,
};

const mapStateToProps = createStructuredSelector({
  projectPage: makeSelectProjectPage(),
  isLoggedIn: makeSelectIsLoggedIn(),
  currentProject: makeSelectProject(),
  currentUser: makeSelectCurrentUser(),
  projectsImportsProcessingData: makeSelectProjectsImportsProcessingData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fnLogoutCurrentUser: () => dispatch(logoutCurrentUser()),
    fnChangeId: id => dispatch(changeId(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'projectPage', reducer });
const withSaga = injectSaga({ key: 'projectPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectPage);
