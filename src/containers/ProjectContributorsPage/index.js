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

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import makeSelectProjectContributorsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { changeId } from './actions';
import { makeSelectIsLoggedIn, makeSelectCurrentUser } from '../App/selectors';
import { makeSelectProject } from '../ProjectPage/selectors';
import { logoutCurrentUser } from '../App/actions';
import Header from '../../components/Header';
import Notification from '../../components/Notification';
import LoadingIndicator from '../../components/LoadingIndicator';
import ProjectMenu from '../../components/ProjectMenu';
import Button from '../../components/Button';

/* eslint-disable react/prefer-stateless-function */
export class ProjectContributorsPage extends React.PureComponent {
  componentWillMount() {
    this.loadProjectIfIdChanged(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadProjectIfIdChanged(nextProps);
  }

  loadProjectIfIdChanged(props) {
    const { id } = props.projectContributorsPage;
    const { match } = props;
    const { params } = match;

    const nextId = params.id;

    if (id !== nextId) {
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
                <div className="card">
                  <div className="card-content">
                    <div>
                      <i className="fas fa-user" />
                      &nbsp;
                      <FormattedMessage {...messages.Owner} />
                      &nbsp; &nbsp;
                      <span className="tag is-danger">
                        @{project.owner.login}
                      </span>
                    </div>
                    <hr />
                    <Button className="is-primary is-small">
                      Add Contributor&nbsp;
                      <small>#todo</small>
                    </Button>
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
