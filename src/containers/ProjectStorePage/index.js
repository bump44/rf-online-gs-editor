/**
 *
 * ProjectStorePage
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
import { Grid, Header as PageHeader } from 'semantic-ui-react';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import * as projectStore from '../App/getters/projectStore';
import { projectsStoresBindActions } from '../App/actions';
import {
  makeSelectCurrentUser,
  makeSelectIsLoggedIn,
  makeSelectProjectsNextValues,
  makeSelectLocalSettings,
} from '../App/selectors';

import { changeId } from './actions';
import makeSelectProjectStorePage, {
  makeSelectProject,
  makeSelectProjectStore,
} from './selectors';

import Header from '../../components/Header';
import Container from '../../components/Container';
import FullheightColumn, {
  FullheightThis,
  FullheightAutoSizer,
} from '../../components/FullheightColumn';

import Notification from '../../components/Notification';
import LoadingIndicator from '../../components/LoadingIndicator';
import ProjectMenu from '../../components/ProjectMenu';
import ProjectStore from '../../components/ProjectStore';
import ProjectStoreLabelDetail from '../../components/ProjectStoreLabelDetail';

/* eslint-disable react/prefer-stateless-function */
export class ProjectStorePage extends React.PureComponent {
  componentWillMount() {
    this.loadProjectIfIdChanged(this.props, { isMount: true });
  }

  componentWillReceiveProps(nextProps) {
    this.loadProjectIfIdChanged(nextProps);
  }

  loadProjectIfIdChanged(props, { isMount = false } = {}) {
    const { id, storeId } = props.projectStorePage;
    const { match } = props;
    const { params } = match;

    const nextId = params.id;
    const nextStoreId = params.storeId;

    if (id !== nextId || storeId !== nextStoreId || isMount) {
      props.fnChangeId(nextId, nextStoreId);
    }
  }

  getName() {
    const {
      currentProjectStore,
      currentProject,
      projectsNextValues,
    } = this.props;

    const projectNextValues = projectsNextValues.getIn(
      [currentProject.get('id'), currentProjectStore.get('id'), 'nextValue'],
      Map({}),
    );

    return projectStore.getName(projectNextValues, {
      item: currentProjectStore,
    });
  }

  render() {
    const {
      currentUser,
      isLoggedIn,
      projectStorePage,
      currentProject,
      currentProjectStore,
      projectsNextValues,
      localSettings,
      match,
      dispatch,
    } = this.props;

    const { isLoaded, isError, errorMessage, isLoading, id } = projectStorePage;

    // very bad
    const fnProjectStoresActions = projectsStoresBindActions({
      dispatch,
      projectId: match.params.id,
      /* eslint-disable indent */
      additionalData: currentProject
        ? {
            moneyTypes: currentProject.getIn(['moneyTypes', 'items']),
            itemGrades: currentProject.getIn(['itemGrades', 'items']),
            weaponTypes: currentProject.getIn(['weaponTypes', 'items']),
          }
        : {},
      /* eslint-enable indent */
    });

    const item = currentProjectStore;
    const itemNextValues =
      currentProject &&
      currentProjectStore &&
      projectsNextValues.getIn(
        [currentProject.get('id'), currentProjectStore.get('id')],
        Map({}),
      );

    return (
      <div>
        <Helmet>
          <title>ProjectStorePage</title>
          <meta name="description" content="Description of ProjectStorePage" />
        </Helmet>

        <Header
          currentProject={currentProject}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
        />

        <Container>
          {isError && (
            <Notification className="is-danger">{errorMessage}</Notification>
          )}

          {isLoading && <LoadingIndicator />}

          {isLoaded && (
            <Grid columns={2}>
              <Grid.Column largeScreen={3} widescreen={2}>
                <ProjectMenu
                  isLoggedIn={isLoggedIn}
                  project={currentProject}
                  projectId={id}
                  currentUser={currentUser}
                />
              </Grid.Column>
              <FullheightColumn largeScreen={13} widescreen={14}>
                <PageHeader>
                  <FormattedMessage
                    {...messages.header}
                    values={{
                      title: currentProject.get(
                        'title',
                        currentProject.get('name'),
                      ),
                      storeName: this.getName(),
                    }}
                  />
                  <ProjectStoreLabelDetail
                    item={item}
                    itemNextValues={itemNextValues}
                  />
                </PageHeader>
                <FullheightThis>
                  <FullheightAutoSizer>
                    <ProjectStore
                      item={item}
                      itemNextValues={itemNextValues}
                      localSettings={localSettings}
                      moneyTypes={currentProject.getIn(['moneyTypes', 'items'])}
                      itemGrades={currentProject.getIn(['itemGrades', 'items'])}
                      weaponTypes={currentProject.getIn([
                        'weaponTypes',
                        'items',
                      ])}
                      actions={fnProjectStoresActions}
                    />
                  </FullheightAutoSizer>
                </FullheightThis>
              </FullheightColumn>
            </Grid>
          )}
        </Container>
      </div>
    );
  }
}

ProjectStorePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectStorePage: makeSelectProjectStorePage(),
  currentUser: makeSelectCurrentUser(),
  currentProject: makeSelectProject(),
  currentProjectStore: makeSelectProjectStore(),
  isLoggedIn: makeSelectIsLoggedIn(),
  projectsNextValues: makeSelectProjectsNextValues(),
  localSettings: makeSelectLocalSettings(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fnChangeId: (id, storeId) => dispatch(changeId(id, storeId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'projectStorePage', reducer });
const withSaga = injectSaga({ key: 'projectStorePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectStorePage);
