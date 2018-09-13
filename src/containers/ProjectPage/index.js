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

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import makeSelectProjectPage, { makeSelectProject } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { changeId } from './actions';
import { makeSelectIsLoggedIn, makeSelectCurrentUser } from '../App/selectors';
import Header from '../../components/Header';
import Notification from '../../components/Notification';
import ProjectMedia from '../../components/ProjectMedia';
import LoadingIndicator from '../../components/LoadingIndicator';
import ProjectMenu from '../../components/ProjectMenu';

/* eslint-disable react/prefer-stateless-function */
export class ProjectPage extends React.PureComponent {
  componentWillMount() {
    this.loadProjectIfIdChanged(this.props, { isMount: true });
  }

  componentWillReceiveProps(nextProps) {
    this.loadProjectIfIdChanged(nextProps);
  }

  loadProjectIfIdChanged(props, { isMount } = {}) {
    const { id } = props.projectPage;
    const { match } = props;
    const { params } = match;

    const nextId = params.id;

    if (id !== nextId || isMount) {
      props.fnChangeId(nextId);
    }
  }

  render() {
    const { isLoggedIn, currentUser, currentProject, projectPage } = this.props;
    const {
      project,
      isLoaded,
      isError,
      errorMessage,
      isLoading,
      id,
    } = projectPage;
    console.log(this);
    return (
      <div>
        <Helmet>
          <title>ProjectPage</title>
          <meta name="description" content="Description of ProjectPage" />
        </Helmet>

        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          currentProject={currentProject}
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
                  <FormattedMessage {...messages.header} />
                </p>
                <ProjectMedia currentUser={currentUser} project={project} />
              </div>
            </div>
          )}
        </div>
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
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
