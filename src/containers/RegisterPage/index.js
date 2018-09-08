/**
 *
 * RegisterPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Header from '../../components/Header';
import FormWrapper from './FormWrapper';
import * as actions from './actions';

/* eslint-disable react/prefer-stateless-function */
export class RegisterPage extends React.PureComponent {
  renderField({
    label,
    icon,
    value,
    type = 'text',
    onChange,
    disabled = false,
  }) {
    return (
      <div className="field">
        <label className="label">{label}</label>

        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
          <span className="icon is-small is-left">
            <i className={`fas fa-${icon}`} />
          </span>
        </div>
      </div>
    );
  }

  render() {
    const {
      registerPage,
      changeLogin,
      changeEmail,
      changePassword,
    } = this.props;

    const { login, email, password } = registerPage;

    return (
      <div>
        <Helmet>
          <title>RegisterPage</title>
          <meta name="description" content="Description of RegisterPage" />
        </Helmet>

        <Header />

        <div className="container is-fluid p-10">
          <FormWrapper>
            {this.renderField({
              label: <FormattedMessage {...messages.Login} />,
              icon: 'user',
              value: login,
              onChange: changeLogin,
            })}
            {this.renderField({
              label: <FormattedMessage {...messages.Email} />,
              icon: 'at',
              value: email,
              onChange: changeEmail,
            })}
            {this.renderField({
              label: <FormattedMessage {...messages.Password} />,
              icon: 'key',
              value: password,
              onChange: changePassword,
              type: 'password',
            })}
          </FormWrapper>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  registerPage: PropTypes.shape({
    login: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  changeLogin: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  registerPage: makeSelectRegisterPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeLogin: evt => dispatch(actions.changeLogin(evt.target.value)),
    changeEmail: evt => dispatch(actions.changeEmail(evt.target.value)),
    changePassword: evt => dispatch(actions.changePassword(evt.target.value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'registerPage', reducer });
const withSaga = injectSaga({ key: 'registerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RegisterPage);
