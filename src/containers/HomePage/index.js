/**
 *
 * HomePage
 *
 */

import {
  makeSelectCurrentUser,
  makeSelectIsLoggedIn,
  makeSelectLocalSettings,
  makeSelectProjectsImportsProcessingData,
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
import injectReducer from '~/utils/injectReducer';
import injectSaga from '~/utils/injectSaga';
import PropTypes from 'prop-types';
import React from 'react';

import makeSelectHomePage from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  render() {
    const {
      isLoggedIn,
      currentUser,
      currentProject,
      onClickLogout,
      projectsImportsProcessingData,
      localSettings,
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>HomePage</title>
          <meta name="description" content="Description of HomePage" />
        </Helmet>

        <Header
          onClickLogout={onClickLogout}
          currentUser={currentUser}
          currentProject={currentProject}
          isLoggedIn={isLoggedIn}
          projectsImportsProcessingData={projectsImportsProcessingData}
          localSettings={localSettings}
        />

        <Container>
          <FormattedMessage {...messages.header} />
        </Container>
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onClickLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.instanceOf(Map),
  currentProject: PropTypes.instanceOf(Map),
  localSettings: PropTypes.instanceOf(Map),
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  isLoggedIn: makeSelectIsLoggedIn(),
  currentUser: makeSelectCurrentUser(),
  currentProject: makeSelectProject(),
  localSettings: makeSelectLocalSettings(),
  projectsImportsProcessingData: makeSelectProjectsImportsProcessingData(),
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

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
