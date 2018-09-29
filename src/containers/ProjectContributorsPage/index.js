/**
 *
 * ProjectContributorsPage
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
import { Grid, Header as PageHeader, Segment, Label } from 'semantic-ui-react';

import withProject from '../App/hocs/withProject';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeSelectIsLoggedIn, makeSelectCurrentUser } from '../App/selectors';
import { logoutCurrentUser } from '../App/actions';
import ProjectMenu from '../../components/ProjectMenu';

/* eslint-disable react/prefer-stateless-function */
export class ProjectContributorsPage extends React.PureComponent {
  render() {
    const { isLoggedIn, currentUser, projectState } = this.props;
    const project = projectState.data.get('project');

    return (
      <div>
        <Helmet>
          <title>ProjectContributorsPage</title>
          <meta
            name="description"
            content="Description of ProjectContributorsPage"
          />
        </Helmet>

        <Grid columns={2}>
          <Grid.Column largeScreen={3} widescreen={2}>
            <ProjectMenu
              isLoggedIn={isLoggedIn}
              project={project}
              projectId={project.get('id')}
              currentUser={currentUser}
            />
          </Grid.Column>
          <Grid.Column largeScreen={13} widescreen={14}>
            <PageHeader>
              <FormattedMessage
                {...messages.header}
                values={{ title: project.get('title') }}
              />
            </PageHeader>
            <Segment>
              <Label color="red">
                {project.getIn(['owner', 'login'])}
                <Label.Detail>
                  <FormattedMessage {...messages.Owner} />
                </Label.Detail>
              </Label>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

ProjectContributorsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onClickLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.instanceOf(Map),
};

ProjectContributorsPage.defaultProps = {};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
  currentUser: makeSelectCurrentUser(),
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

const withReducer = injectReducer({ key: 'projectContributorsPage', reducer });
const withSaga = injectSaga({ key: 'projectContributorsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withProject({
    variables: ({
      match: {
        params: { id },
      },
    }) => ({
      id,
    }),
  }),
)(ProjectContributorsPage);
