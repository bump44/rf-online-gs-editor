/**
 *
 * ProjectStorePage
 *
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { Grid, Header as PageHeader } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { IMMUTABLE_MAP, ITEM } from 'containers/App/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import PropTypes from 'prop-types';
import React from 'react';

import {
  projectsStoresBindActions,
  projectsItemsBindActions,
  projectsEntriesFinderItemsBindActions,
  projectsMapSptsBindActions,
  logoutCurrentUser,
} from 'containers/App/actions';

import {
  makeSelectCurrentUser,
  makeSelectIsLoggedIn,
  makeSelectProjectsNextValues,
  makeSelectLocalSettings,
  makeSelectProjectsEntriesFinder,
  makeSelectProjectsImportsProcessingData,
  makeSelectProjectImportsProcessingData,
} from 'containers/App/selectors';

import { getRefs } from 'containers/App/getters/project';
import * as projectStore from 'containers/App/getters/projectStore';

import Header from 'components/Header';
import Container from 'components/Container';
import FullheightColumn, {
  FullheightThis,
  FullheightAutoSizer,
} from 'components/FullheightColumn';

import Notification from 'components/Notification';
import LoadingIndicator from 'components/LoadingIndicator';
import ProjectMenu from 'components/ProjectMenu';
import ProjectStore from 'components/Project/Store';
import ProjectStoreLabelDetail from 'components/Project/StoreLabelDetail';

import messages from './messages';
import reducer from './reducer';
import saga from './saga';

import { changeId } from './actions';

import makeSelectProjectStorePage, {
  makeSelectProject,
  makeSelectProjectStore,
} from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class ProjectStorePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getActionsBindPayload = this.getActionsBindPayload.bind(this);
  }

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

    return projectStore.getName(
      projectsNextValues.getIn([
        currentProject.get('id'),
        currentProjectStore.get('id'),
        'nextValue',
      ]),
      {
        entry: currentProjectStore,
      },
    );
  }

  getActionsBindPayload() {
    const { dispatch, match, currentProject, projectsNextValues } = this.props;

    const project = currentProject || IMMUTABLE_MAP;
    const nextValues = projectsNextValues.getIn(
      [match.params.id, match.params.id],
      IMMUTABLE_MAP,
    );

    return {
      dispatch,
      projectId: match.params.id,
      additionalData: getRefs(nextValues.get('nextValue'), { entry: project }),
    };
  }

  render() {
    const {
      currentUser,
      isLoggedIn,
      projectStorePage,
      currentProject,
      currentProjectStore,
      projectsNextValues,
      projectsEntriesFinder,
      localSettings,
      entriesFinderItemsActions,
      fnLogoutCurrentUser,
      projectsImportsProcessingData,
      projectImportsProcessingData,
    } = this.props;

    const { isLoaded, isError, errorMessage, isLoading, id } = projectStorePage;

    const actionsBindPayload = this.getActionsBindPayload();
    const {
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      buttonTypes,
      mapNameTypes,
    } = actionsBindPayload.additionalData;

    const fnProjectItemsActions = projectsItemsBindActions(actionsBindPayload);
    const fnProjectStoresActions = projectsStoresBindActions(
      actionsBindPayload,
    );
    const fnProjectMapSptsActions = projectsMapSptsBindActions(
      actionsBindPayload,
    );

    const store = currentProjectStore;

    // global
    const nextValues =
      currentProject &&
      projectsNextValues.get(currentProject.get('id'), IMMUTABLE_MAP);

    // store nextValues
    const storeNextValues =
      nextValues &&
      currentProjectStore &&
      nextValues.get(currentProjectStore.get('id'), IMMUTABLE_MAP);

    const entriesFinderItems =
      currentProject &&
      projectsEntriesFinder.getIn(
        [currentProject.get('id'), ITEM],
        IMMUTABLE_MAP,
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
          onClickLogout={fnLogoutCurrentUser}
          projectsImportsProcessingData={projectsImportsProcessingData}
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
                  projectImportsProcessingData={projectImportsProcessingData}
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
                    store={store}
                    storeNextValues={storeNextValues}
                  />
                </PageHeader>
                <FullheightThis>
                  <FullheightAutoSizer>
                    <ProjectStore
                      store={store}
                      storeNextValues={storeNextValues}
                      storeActions={fnProjectStoresActions}
                      itemActions={fnProjectItemsActions}
                      mapSptActions={fnProjectMapSptsActions}
                      entriesFinderItemsActions={entriesFinderItemsActions}
                      localSettings={localSettings}
                      moneyTypes={moneyTypes}
                      itemGradeTypes={itemGradeTypes}
                      weaponTypes={weaponTypes}
                      buttonTypes={buttonTypes}
                      mapNameTypes={mapNameTypes}
                      entriesFinderItems={entriesFinderItems}
                      nextValues={nextValues}
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
  localSettings: makeSelectLocalSettings(),
  projectsNextValues: makeSelectProjectsNextValues(),
  projectsEntriesFinder: makeSelectProjectsEntriesFinder(),
  projectsImportsProcessingData: makeSelectProjectsImportsProcessingData(),
  projectImportsProcessingData: (
    state,
    {
      match: {
        params: { id },
      },
    },
  ) => makeSelectProjectImportsProcessingData(id)(state),
});

function mapDispatchToProps(
  dispatch,
  {
    match: {
      params: { id },
    },
  },
) {
  return {
    dispatch,
    fnLogoutCurrentUser: () => dispatch(logoutCurrentUser()),
    fnChangeId: (payloadID, storeId) => dispatch(changeId(payloadID, storeId)),
    entriesFinderItemsActions: projectsEntriesFinderItemsBindActions({
      projectId: id,
      dispatch,
    }),
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
