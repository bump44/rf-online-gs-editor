/**
 *
 * ProjectItemPage
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

import {
  makeSelectCurrentUser,
  makeSelectIsLoggedIn,
  makeSelectProjectsNextValues,
  makeSelectLocalSettings,
} from '../App/selectors';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import makeSelectProjectItemPage, {
  makeSelectProject,
  makeSelectProjectItem,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { changeId } from './actions';

import Header from '../../components/Header';
import Container from '../../components/Container';
import FullheightColumn, {
  FullheightThis,
  FullheightAutoSizer,
} from '../../components/FullheightColumn';
import Notification from '../../components/Notification';
import LoadingIndicator from '../../components/LoadingIndicator';
import ProjectMenu from '../../components/ProjectMenu';
import ProjectItem from '../../components/ProjectItem';
import { projectsItemsBindActions } from '../App/actions';

/* eslint-disable react/prefer-stateless-function */
export class ProjectItemPage extends React.PureComponent {
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

  getName() {
    const {
      currentProjectItem,
      currentProject,
      projectsNextValues,
    } = this.props;

    const projectNextValues = projectsNextValues.get(
      currentProject.get('id'),
      Map({}),
    );

    const nextValue = projectNextValues.getIn([
      'nextValue',
      'clientNd',
      'strName',
    ]);

    const currValue = currentProjectItem.getIn(
      [
        ['priorStrName'],
        ['clientNd', 'strName'],
        ['client', 'strName'],
        ['serverStr', 'strNameEN'],
        ['serverStr', 'strNameGLOBAL'],
        ['server', 'strName'],
      ].find(fieldSets => currentProjectItem.getIn(fieldSets) !== undefined) ||
        'priorStrName',
      '',
    );

    const value = nextValue !== undefined ? nextValue : currValue;

    return value;
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
      match,
      dispatch,
    } = this.props;

    const { isLoaded, isError, errorMessage, isLoading, id } = projectItemPage;

    // very bad
    const fnProjectItemsActions = projectsItemsBindActions({
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
                      itemName: this.getName(),
                    }}
                  />
                </PageHeader>
                <FullheightThis>
                  <FullheightAutoSizer>
                    <ProjectItem
                      item={currentProjectItem}
                      itemNextValues={projectsNextValues.getIn(
                        [
                          currentProject.get('id'),
                          currentProjectItem.get('id'),
                        ],
                        Map({}),
                      )}
                      localSettings={localSettings}
                      moneyTypes={currentProject.getIn(['moneyTypes', 'items'])}
                      itemGrades={currentProject.getIn(['itemGrades', 'items'])}
                      weaponTypes={currentProject.getIn([
                        'weaponTypes',
                        'items',
                      ])}
                      actions={fnProjectItemsActions}
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
  localSettings: makeSelectLocalSettings(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fnChangeId: (id, itemId) => dispatch(changeId(id, itemId)),
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
