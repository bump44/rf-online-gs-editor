/**
 *
 * ProjectItemPage
 *
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { getRefs } from '~/containers/App/getters/project';
import { Grid, Header as PageHeader } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { IMMUTABLE_MAP, ITEM } from '~/containers/App/constants';
import * as projectItem from '~/containers/App/getters/projectItem';
import injectReducer from '~/utils/injectReducer';
import injectSaga from '~/utils/injectSaga';
import PropTypes from 'prop-types';
import React from 'react';

import {
  projectsItemsBindActions,
  projectsBoxItemOutsBindActions,
  projectsEntriesFinderItemsBindActions,
  logoutCurrentUser,
  projectsPotionItemEffectsBindActions,
} from '~/containers/App/actions';

import {
  makeSelectCurrentUser,
  makeSelectIsLoggedIn,
  makeSelectProjectsNextValues,
  makeSelectLocalSettings,
  makeSelectProjectsEntriesFinder,
  makeSelectProjectImportsProcessingData,
  makeSelectProjectsImportsProcessingData,
} from '~/containers/App/selectors';

import Header from '~/components/Header';
import Container from '~/components/Container';

import FullheightColumn, {
  FullheightThis,
  FullheightAutoSizer,
} from '~/components/FullheightColumn';

import Notification from '~/components/Notification';
import LoadingIndicator from '~/components/LoadingIndicator';
import ProjectMenu from '~/components/ProjectMenu';
import ProjectItem from '~/components/Project/Item';
import ProjectItemLabelDetail from '~/components/Project/ItemLabelDetail';

import { changeId } from './actions';

import makeSelectProjectItemPage, {
  makeSelectProject,
  makeSelectProjectItem,
} from './selectors';

import messages from './messages';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class ProjectItemPage extends React.PureComponent {
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
    const { id, itemId } = props.projectItemPage;
    const { match } = props;
    const { params } = match;

    const nextId = params.id;
    const nextItemId = params.itemId;

    if (id !== nextId || itemId !== nextItemId || isMount) {
      props.fnChangeId(nextId, nextItemId);
    }
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

  getName() {
    const {
      currentProjectItem,
      currentProject,
      projectsNextValues,
    } = this.props;

    const projectNextValues = projectsNextValues.getIn(
      [currentProject.get('id'), currentProjectItem.get('id'), 'nextValue'],
      IMMUTABLE_MAP,
    );

    return projectItem.getName(projectNextValues, {
      entry: currentProjectItem,
    });
  }

  render() {
    const {
      currentUser,
      isLoggedIn,
      projectItemPage,
      currentProject,
      currentProjectItem,
      projectsNextValues,
      localSettings,
      projectsEntriesFinder,
      entriesFinderItemsActions,
      projectImportsProcessingData,
      fnLogoutCurrentUser,
      projectsImportsProcessingData,
    } = this.props;

    const { isLoaded, isError, errorMessage, isLoading, id } = projectItemPage;
    const actionsBindPayload = this.getActionsBindPayload();

    const {
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      expertTypes,
      effectTypes,
    } = actionsBindPayload.additionalData;

    const itemActions = projectsItemsBindActions(actionsBindPayload);
    const boxItemOutActions = projectsBoxItemOutsBindActions(
      actionsBindPayload,
    );
    const potionItemEffectActions = projectsPotionItemEffectsBindActions(
      actionsBindPayload,
    );

    const nextValues =
      currentProject &&
      projectsNextValues.get(currentProject.get('id'), IMMUTABLE_MAP);

    const item = currentProjectItem;

    const itemNextValues =
      currentProject &&
      currentProjectItem &&
      nextValues.get(currentProjectItem.get('id'), IMMUTABLE_MAP);

    const entriesFinderItems =
      currentProject &&
      projectsEntriesFinder.getIn(
        [currentProject.get('id'), ITEM],
        IMMUTABLE_MAP,
      );

    return (
      <div>
        <Helmet>
          <title>ProjectItemPage</title>
          <meta name="description" content="Description of ProjectItemPage" />
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
                      itemName: this.getName(),
                    }}
                  />
                  <ProjectItemLabelDetail
                    item={item}
                    itemNextValues={itemNextValues}
                  />
                </PageHeader>
                <FullheightThis>
                  <FullheightAutoSizer>
                    <ProjectItem
                      item={item}
                      itemNextValues={itemNextValues}
                      nextValues={nextValues}
                      localSettings={localSettings}
                      moneyTypes={moneyTypes}
                      itemGradeTypes={itemGradeTypes}
                      weaponTypes={weaponTypes}
                      expertTypes={expertTypes}
                      effectTypes={effectTypes}
                      itemActions={itemActions}
                      boxItemOutActions={boxItemOutActions}
                      entriesFinderItems={entriesFinderItems}
                      entriesFinderItemsActions={entriesFinderItemsActions}
                      potionItemEffectActions={potionItemEffectActions}
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

ProjectItemPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectItemPage: makeSelectProjectItemPage(),
  currentUser: makeSelectCurrentUser(),
  currentProject: makeSelectProject(),
  currentProjectItem: makeSelectProjectItem(),
  isLoggedIn: makeSelectIsLoggedIn(),
  projectsNextValues: makeSelectProjectsNextValues(),
  projectsEntriesFinder: makeSelectProjectsEntriesFinder(),
  localSettings: makeSelectLocalSettings(),
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
    fnChangeId: (payloadID, itemId) => dispatch(changeId(payloadID, itemId)),
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

const withReducer = injectReducer({ key: 'projectItemPage', reducer });
const withSaga = injectSaga({ key: 'projectItemPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectItemPage);
