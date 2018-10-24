/**
 *
 * NotFoundPage
 *
 */

import {
  makeSelectCurrentUser,
  makeSelectIsLoggedIn,
} from '~/containers/App/selectors';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { logoutCurrentUser } from '~/containers/App/actions';
import { makeSelectProject } from '~/containers/ProjectPage/selectors';
import { Map } from 'immutable';
import Container from '~/components/Container';
import Header from '~/components/Header';
import Notification from '~/components/Notification';
import PropTypes from 'prop-types';
import React from 'react';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class NotFoundPage extends React.PureComponent {
  render() {
    const {
      currentProject,
      currentUser,
      isLoggedIn,
      onClickLogout,
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
          onClickLogout={onClickLogout}
        />

        <Container>
          <Notification type="danger">
            <FormattedMessage {...messages.message} />
          </Notification>
        </Container>
      </div>
    );
  }
}

NotFoundPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onClickLogout: PropTypes.func.isRequired,
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
    onClickLogout: () => dispatch(logoutCurrentUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(NotFoundPage);
