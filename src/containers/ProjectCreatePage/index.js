/**
 *
 * ProjectCreatePage
 *
 */

import { Card, Grid, Header as PageHeader } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import {
  makeSelectCurrentUser,
  makeSelectIsLoggedIn,
} from 'containers/App/selectors';

import { makeSelectProject } from 'containers/ProjectPage/selectors';
import { Map } from 'immutable';
import { push } from 'react-router-redux';
import Container from 'components/Container';
import Header from 'components/Header';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Notification from 'components/Notification';
import ProjectCreateForm from 'components/ProjectCreateForm';
import PropTypes from 'prop-types';
import React from 'react';

import * as actions from './actions';
import makeSelectProjectCreatePage from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

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
        <Container>
          <Grid centered columns={3}>
            <Grid.Column>
              <PageHeader>
                <FormattedMessage {...messages.header} />
              </PageHeader>

              <Card fluid>
                <Card.Content>
                  {isError && (
                    <Notification type="danger">{errorMessage}</Notification>
                  )}

                  <ProjectCreateForm
                    loading={isLoading}
                    values={{
                      title,
                      description,
                      isPublic,
                    }}
                    onChangeTitle={changeTitle}
                    onChangeDescription={changeDescription}
                    onChangeIsPublic={changeIsPublic}
                    onSubmit={submit}
                  />
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </Container>
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
    changeIsPublic: (evt, props) =>
      dispatch(actions.changeIsPublic(props.checked)),
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
