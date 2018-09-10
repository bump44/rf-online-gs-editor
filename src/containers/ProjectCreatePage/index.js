/**
 *
 * ProjectCreatePage
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
import { push } from 'react-router-redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import makeSelectProjectCreatePage from './selectors';
import { makeSelectIsLoggedIn, makeSelectCurrentUser } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as actions from './actions';
import { makeSelectProject } from '../ProjectPage/selectors';

import Header from '../../components/Header';
import Notification from '../../components/Notification';
import Button from '../../components/Button';

/* eslint-disable react/prefer-stateless-function */
export class ProjectCreatePage extends React.PureComponent {
  componentDidMount() {
    this.redirectToMainPageIfNotIsLoggedIn(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.redirectToMainPageIfNotIsLoggedIn(nextProps);
  }

  redirectToMainPageIfNotIsLoggedIn(props) {
    const { isLoggedIn, changeLocation } = props;
    if (!isLoggedIn) changeLocation('/');
  }

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

        <div className="control has-icons-left">
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
      isLoggedIn,
      currentProject,
      currentUser,
      projectCreatePage,
      submit,
      changeTitle,
      changeDescription,
      changeIsPublic,
    } = this.props;

    const {
      isLoading,
      isError,
      errorMessage,
      title,
      description,
      isPublic,
    } = projectCreatePage;

    return (
      <div>
        <Helmet>
          <title>ProjectCreatePage</title>
          <meta name="description" content="Description of ProjectCreatePage" />
        </Helmet>

        <Header
          isLoggedIn={isLoggedIn}
          currentProject={currentProject}
          currentUser={currentUser}
        />
        <div className="container is-fluid p-10">
          <p className="title is-6 mb-5">
            <FormattedMessage {...messages.header} />
          </p>
          <div className="card">
            <div className="card-content">
              {isError && (
                <Notification className="is-danger">
                  {errorMessage}
                </Notification>
              )}

              {this.renderField({
                label: <FormattedMessage {...messages.Title} />,
                icon: 'external-link-square-alt',
                value: title,
                onChange: changeTitle,
              })}

              {this.renderField({
                label: <FormattedMessage {...messages.Description} />,
                icon: 'file-alt',
                value: description,
                onChange: changeDescription,
              })}

              <div className="field">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={changeIsPublic}
                    value={1}
                  />
                  <FormattedMessage {...messages.IsPublicProject} />
                </label>
              </div>

              <Button
                onClick={submit}
                loading={isLoading}
                className="is-primary"
                icon="plus"
              >
                <FormattedMessage {...messages.Submit} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectCreatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  changeLocation: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
  changeIsPublic: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  currentProject: PropTypes.instanceOf(Map),
  currentUser: PropTypes.instanceOf(Map),
};

ProjectCreatePage.defaultProps = {
  currentProject: null,
  currentUser: null,
};

const mapStateToProps = createStructuredSelector({
  projectCreatePage: makeSelectProjectCreatePage(),
  isLoggedIn: makeSelectIsLoggedIn(),
  currentUser: makeSelectCurrentUser(),
  currentProject: makeSelectProject(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeLocation: (location = '/') => dispatch(push(location)),
    changeTitle: evt => dispatch(actions.changeTitle(evt.target.value)),
    changeDescription: evt =>
      dispatch(actions.changeDescription(evt.target.value)),
    changeIsPublic: evt => dispatch(actions.changeIsPublic(evt.target.checked)),
    submit: () => dispatch(actions.submit()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'projectCreatePage', reducer });
const withSaga = injectSaga({ key: 'projectCreatePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectCreatePage);
