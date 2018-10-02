/**
 *
 * ProjectContributorsPage
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
import { Grid, Header as PageHeader, Segment, Label } from 'semantic-ui-react';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import makeSelectProjectContributorsPage, {
  makeSelectProject,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { changeId } from './actions';

import {
  makeSelectIsLoggedIn,
  makeSelectCurrentUser,
  makeSelectProjectsImportsProcessingData,
  makeSelectProjectImportsProcessingData,
} from '../App/selectors';

import { logoutCurrentUser } from '../App/actions';
import Header from '../../components/Header';
import Container from '../../components/Container';
import Notification from '../../components/Notification';
import LoadingIndicator from '../../components/LoadingIndicator';
import ProjectMenu from '../../components/ProjectMenu';

/* eslint-disable react/prefer-stateless-function */
export class ProjectContributorsPage extends React.PureComponent {
  componentWillMount() {
    this.loadProjectIfIdChanged(this.props, { isMount: true });
  }

  componentWillReceiveProps(nextProps) {
    this.loadProjectIfIdChanged(nextProps);
  }

  loadProjectIfIdChanged(props, { isMount = false } = {}) {
    const { id } = props.projectContributorsPage;
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
      projectContributorsPage,
      fnLogoutCurrentUser,
      projectsImportsProcessingData,
      projectImportsProcessingData,
    } = this.props;

    const {
      project,
      isLoaded,
      isError,
      errorMessage,
      isLoading,
      id,
    } = projectContributorsPage;

    return (
      <div>
        <Helmet>
          <title>ProjectContributorsPage</title>
          <meta
            name="description"
            content="Description of ProjectContributorsPage"
          />
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
              <Grid.Column largeScreen={13} widescreen={14}>
                <PageHeader>
                  <FormattedMessage
                    {...messages.header}
                    values={{ title: project.title }}
                  />
                </PageHeader>
                <Segment>
                  <Label color="red">
                    {project.owner.login}
                    <Label.Detail>
                      <FormattedMessage {...messages.Owner} />
                    </Label.Detail>
                  </Label>
                </Segment>
              </Grid.Column>
            </Grid>
          )}
        </Container>
      </div>
    );
  }
}

ProjectContributorsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fnChangeId: PropTypes.func.isRequired,
  fnLogoutCurrentUser: PropTypes.func.isRequired,
  projectContributorsPage: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  currentProject: PropTypes.instanceOf(Map),
  currentUser: PropTypes.instanceOf(Map),
};

ProjectContributorsPage.defaultProps = {
  currentProject: null,
  currentUser: null,
};

const mapStateToProps = createStructuredSelector({
  projectContributorsPage: makeSelectProjectContributorsPage(),
  isLoggedIn: makeSelectIsLoggedIn(),
  currentProject: makeSelectProject(),
  currentUser: makeSelectCurrentUser(),
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fnChangeId: id => dispatch(changeId(id)),
    fnLogoutCurrentUser: () => dispatch(logoutCurrentUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'projectContributorsPage', reducer });
const withSaga = injectSaga({ key: 'projectContributorsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectContributorsPage);
