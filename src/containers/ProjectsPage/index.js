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

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import makeSelectProjectsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadingStart } from './actions';
import { makeSelectIsLoggedIn, makeSelectCurrentUser } from '../App/selectors';
import { logoutCurrentUser } from '../App/actions';
import Header from '../../components/Header';
import ProjectMedia from '../../components/ProjectMedia';
import ProjectsTabs from '../../components/ProjectsTabs';

/* eslint-disable react/prefer-stateless-function */
export class ProjectsPage extends React.PureComponent {
  componentWillMount() {
    const { fnLoadingStart } = this.props;
    fnLoadingStart(); // loading projects
  }

  renderCardWithItems({ items, total }, { title = {} }) {
    const { currentUser } = this.props;

    return (
      <div className="card">
        <div className="card-content p-0">
          <p className="title is-6 p-10 m-0">
            <FormattedMessage {...title} />{' '}
            <small className="tag">{total}</small>
          </p>

          {items.map(item => (
            <ProjectMedia
              project={item}
              key={item.id}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { isLoggedIn, currentUser, projectsPage } = this.props;
    const { result } = projectsPage;
    const { projectsMy, projectsNew } = result;

    return (
      <div>
        <Helmet>
          <title>ProjectsPage</title>
          <meta name="description" content="Description of ProjectsPage" />
        </Helmet>

        <Header isLoggedIn={isLoggedIn} currentUser={currentUser} />

        <div className="container is-fluid p-10">
          <ProjectsTabs isLoggedIn={isLoggedIn} />

          <div className="columns">
            {isLoggedIn && (
              <div className="column">
                {this.renderCardWithItems(projectsMy, {
                  title: messages.titleMyProjects,
                })}
              </div>
            )}
            <div className="column">
              {this.renderCardWithItems(projectsNew, {
                title: messages.titleNewProjects,
              })}
            </div>
          </div>
        </div>
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
  isLoggedIn: PropTypes.bool,
  currentUser: PropTypes.instanceOf(Map),
};

ProjectsPage.defaultProps = {
  currentUser: null,
};

const mapStateToProps = createStructuredSelector({
  projectsPage: makeSelectProjectsPage(),
  isLoggedIn: makeSelectIsLoggedIn(),
  currentUser: makeSelectCurrentUser(),
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
