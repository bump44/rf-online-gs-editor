/**
 *
 * ProjectsPage
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
import { Header as PageHeader, Grid } from 'semantic-ui-react';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import makeSelectProjectsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { loadingStart } from './actions';
import { makeSelectIsLoggedIn, makeSelectCurrentUser } from '../App/selectors';
import { logoutCurrentUser } from '../App/actions';
import { makeSelectProject } from '../ProjectPage/selectors';

import Header from '../../components/Header';
import Container from '../../components/Container';
import ProjectsMediaItems from '../../components/ProjectsMediaItems';

/* eslint-disable react/prefer-stateless-function */
export class ProjectsPage extends React.PureComponent {
  componentWillMount() {
    const { fnLoadingStart } = this.props;
    fnLoadingStart(); // loading projects
  }

  render() {
    const {
      isLoggedIn,
      currentUser,
      currentProject,
      projectsPage,
      fnLogoutCurrentUser,
    } = this.props;

    const { result } = projectsPage;
    const { projectsMy, projectsNew } = result;

    return (
      <div>
        <Helmet>
          <title>ProjectsPage</title>
          <meta name="description" content="Description of ProjectsPage" />
        </Helmet>

        <Header
          isLoggedIn={isLoggedIn}
          onClickLogout={fnLogoutCurrentUser}
          currentUser={currentUser}
          currentProject={currentProject}
        />

        <Container>
          <Grid columns={isLoggedIn ? 2 : 1}>
            {isLoggedIn && (
              <Grid.Column>
                <PageHeader>
                  <FormattedMessage {...messages.titleMyProjects} />
                </PageHeader>
                <ProjectsMediaItems
                  items={projectsMy.items}
                  total={projectsMy.total}
                  currentUser={currentUser}
                />
              </Grid.Column>
            )}

            <Grid.Column>
              <PageHeader>
                <FormattedMessage {...messages.titleNewProjects} />
              </PageHeader>
              <ProjectsMediaItems
                items={projectsNew.items}
                total={projectsNew.total}
                currentUser={currentUser}
              />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

ProjectsPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  projectsPage: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    result: PropTypes.shape({
      projectsMy: PropTypes.shape({
        items: PropTypes.array.isRequired,
        total: PropTypes.number.isRequired,
      }),
      projectsNew: PropTypes.shape({
        items: PropTypes.array.isRequired,
        total: PropTypes.number.isRequired,
      }),
    }),
  }),
  fnLoadingStart: PropTypes.func.isRequired,
  fnLogoutCurrentUser: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  currentUser: PropTypes.instanceOf(Map),
  currentProject: PropTypes.instanceOf(Map),
};

ProjectsPage.defaultProps = {
  currentUser: null,
  currentProject: null,
};

const mapStateToProps = createStructuredSelector({
  projectsPage: makeSelectProjectsPage(),
  isLoggedIn: makeSelectIsLoggedIn(),
  currentUser: makeSelectCurrentUser(),
  currentProject: makeSelectProject(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fnLoadingStart: () => dispatch(loadingStart()),
    fnLogoutCurrentUser: () => dispatch(logoutCurrentUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'projectsPage', reducer });
const withSaga = injectSaga({ key: 'projectsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectsPage);
