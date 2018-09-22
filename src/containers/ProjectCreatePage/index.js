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
import { Header as PageHeader, Grid, Card } from 'semantic-ui-react';

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
import Container from '../../components/Container';
import Notification from '../../components/Notification';
import ProjectCreateForm from '../../components/ProjectCreateForm';

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
