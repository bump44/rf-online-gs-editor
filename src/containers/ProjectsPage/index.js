/**
 *
 * ProjectsPage
 *
 */

import { Grid, Label, Header as PageHeader } from 'semantic-ui-react';

import {
  makeSelectCurrentUser,
  makeSelectIsLoggedIn,
  makeSelectProjectsImportsProcessingData,
} from 'containers/App/selectors';

import Container from 'components/Container';
import { FormattedMessage } from 'react-intl';
import Header from 'components/Header';
import { Helmet } from 'react-helmet';
import { Map } from 'immutable';
import ProjectsMediaItems from 'components/ProjectsMediaItems';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { logoutCurrentUser } from 'containers/App/actions';
import { makeSelectProject } from 'containers/ProjectPage/selectors';
import makeSelectProjectsPage from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { loadingStart } from './actions';

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
      projectsImportsProcessingData,
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
          projectsImportsProcessingData={projectsImportsProcessingData}
        />

        <Container>
          <Grid columns={isLoggedIn ? 2 : 1}>
            {isLoggedIn && (
              <Grid.Column>
                <PageHeader>
                  <FormattedMessage {...messages.titleMyProjects} />
                  <Label circular color="grey">
                    {projectsMy.total}
                  </Label>
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
                <Label circular color="grey">
                  {projectsNew.total}
                </Label>
              </PageHeader>
              <ProjectsMediaItems
                items={projectsNew.items}
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
  projectsImportsProcessingData: makeSelectProjectsImportsProcessingData(),
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
