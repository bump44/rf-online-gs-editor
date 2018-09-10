/**
 *
 * NotFoundPage
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

import messages from './messages';
import { logoutCurrentUser } from '../App/actions';
import { makeSelectIsLoggedIn, makeSelectCurrentUser } from '../App/selectors';
import { makeSelectProject } from '../ProjectPage/selectors';

import Header from '../../components/Header';
import Notification from '../../components/Notification';

/* eslint-disable react/prefer-stateless-function */
export class NotFoundPage extends React.PureComponent {
  render() {
    const {
      currentProject,
      currentUser,
      isLoggedIn,
      fnLogoutCurrentUser,
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>NotFoundPage</title>
          <meta name="description" content="Description of NotFoundPage" />
        </Helmet>

        <Header
          currentProject={currentProject}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          onClickLogout={fnLogoutCurrentUser}
        />
        <div className="container is-fluid p-10">
          <Notification className="is-danger">
            <FormattedMessage {...messages.message} />
          </Notification>
        </div>
      </div>
    );
  }
}

NotFoundPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fnLogoutCurrentUser: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.instanceOf(Map),
  currentProject: PropTypes.instanceOf(Map),
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
  currentUser: makeSelectCurrentUser(),
  currentProject: makeSelectProject(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fnLogoutCurrentUser: () => dispatch(logoutCurrentUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(NotFoundPage);
