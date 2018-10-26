/**
 *
 * LoginPage
 *
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Button } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Map } from 'immutable';
import { push } from 'react-router-redux';

import injectReducer from '~/utils/injectReducer';
import injectSaga from '~/utils/injectSaga';
import PropTypes from 'prop-types';
import React from 'react';

import {
  makeSelectIsLoggedIn,
  makeSelectCurrentUser,
  makeSelectProjectsImportsProcessingData,
} from '~/containers/App/selectors';

import Header from '~/components/Header';
import Notification from '~/components/Notification';

import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as actions from './actions';

import FormWrapper from './FormWrapper';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.PureComponent {
  componentDidMount() {
    this.redirectToMainPageIfIsLoggedIn(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.redirectToMainPageIfIsLoggedIn(nextProps);
  }

  redirectToMainPageIfIsLoggedIn(props) {
    const { isLoggedIn, changeLocation } = props;
    if (isLoggedIn) changeLocation('/');
  }

  renderField({ label, value, type = 'text', onChange, disabled = false }) {
    return (
      <Form.Field>
        <label>{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </Form.Field>
    );
  }

  render() {
    const {
      loginPage,
      changeIndent,
      changePassword,
      submit,
      isLoggedIn,
      currentUser,
      projectsImportsProcessingData,
    } = this.props;

    const { indent, password, isLoading, isError, errorMessage } = loginPage;

    return (
      <div>
        <Helmet>
          <title>LoginPage</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>

        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          projectsImportsProcessingData={projectsImportsProcessingData}
        />

        <div className="container is-fluid p-10">
          <FormWrapper>
            {isError && (
              <Notification type="danger">
                {errorMessage.replace('GraphQL error: ', '')}
              </Notification>
            )}

            <Form size="small" loading={isLoading}>
              {this.renderField({
                label: <FormattedMessage {...messages.Indent} />,
                value: indent,
                onChange: changeIndent,
              })}
              {this.renderField({
                label: <FormattedMessage {...messages.Password} />,
                value: password,
                onChange: changePassword,
                type: 'password',
              })}

              <Button onClick={submit} loading={isLoading} primary>
                <FormattedMessage {...messages.SubmitLoginForm} />
              </Button>
            </Form>
          </FormWrapper>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loginPage: PropTypes.shape({
    login: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    errorMessage: PropTypes.string,
  }),
  changeIndent: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  changeLocation: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.instanceOf(Map),
};

LoginPage.defaultProps = {
  currentUser: null,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  isLoggedIn: makeSelectIsLoggedIn(),
  currentUser: makeSelectCurrentUser(),
  projectsImportsProcessingData: makeSelectProjectsImportsProcessingData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeIndent: evt => dispatch(actions.changeIndent(evt.target.value)),
    changePassword: evt => dispatch(actions.changePassword(evt.target.value)),
    changeLocation: (location = '/') => dispatch(push(location)),
    submit: () => dispatch(actions.submit()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
