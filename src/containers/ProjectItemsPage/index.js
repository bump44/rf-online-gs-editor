/**
 *
 * ProjectItemsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Promise from 'bluebird';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, Header as PageHeader, Label } from 'semantic-ui-react';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import makeSelectProjectItemsPage, {
  makeSelectProject,
  makeSelectResult,
  makeSelectFilter,
  makeSelectProjectMoneyTypes,
  makeSelectProjectItemGrades,
  makeSelectProjectWeaponTypes,
} from './selectors';

import {
  makeSelectProjectsImportsProcessingData,
  makeSelectCurrentUser,
  makeSelectIsLoggedIn,
  makeSelectProjectsNextValues,
  makeSelectLocalSettings,
} from '../App/selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { projectsItemsBindActions, logoutCurrentUser } from '../App/actions';
import {
  changeId,
  changeFilterTakeSkip,
  resetResult,
  changeFilterSortBy,
  changeFilterSortWay,
  changeFilterWhereSearch,
  changeFilterWhereType,
} from './actions';

import Header from '../../components/Header';
import Container from '../../components/Container';
import FullheightColumn, {
  FullheightThis,
} from '../../components/FullheightColumn';
import ProjectMenu from '../../components/ProjectMenu';
import Notification from '../../components/Notification';
import LoadingIndicator from '../../components/LoadingIndicator';
import InfiniteAutoSizeList from '../../components/InfiniteAutoSizeList';
import ProjectItemVirtualizedRow from '../../components/ProjectItemVirtualizedRow';
import ProjectItemsFilters from '../../components/ProjectItemsFilters';

/* eslint-disable react/prefer-stateless-function */
export class ProjectItemsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
  }

  componentWillMount() {
    this.loadProjectIfIdChanged(this.props, { isMount: true });
    this.loadMoreRows({ startIndex: 0, stopIndex: 25 });
  }

  componentWillReceiveProps(nextProps) {
    this.loadProjectIfIdChanged(nextProps);
    const { result } = this.props;

    if (
      !result.get('items').count() !== nextProps.result.get('items').count() &&
      this.infiniteAutoSizeList
    ) {
      this.infiniteAutoSizeList.forceUpdateGrid();
    }
  }

  componentWillUnmount() {
    const { fnResetResult } = this.props;
    fnResetResult(); // clean state
  }

  loadProjectIfIdChanged(props, { isMount = false } = {}) {
    const { id } = props.projectItemsPage;
    const { match } = props;
    const { params } = match;

    const nextId = params.id;

    if (id !== nextId || isMount) {
      props.fnChangeId(nextId);
      props.fnResetResult(); // clean state
    }
  }

  isRowLoaded({ index }) {
    const { result } = this.props;
    return !!result.get('items').get(index);
  }

  rowRenderer({ key, ...props }) {
    const {
      result,
      currentProject,
      projectsNextValues,
      projectMoneyTypes,
      projectItemGrades,
      projectWeaponTypes,
      localSettings,
      match,
      dispatch,
    } = this.props;

    const fnProjectItemsActions = projectsItemsBindActions({
      dispatch,
      projectId: match.params.id,
      /* eslint-disable indent */
      additionalData: currentProject
        ? {
            moneyTypes: projectMoneyTypes,
            itemGrades: projectItemGrades,
            weaponTypes: projectWeaponTypes,
          }
        : {},
      /* eslint-enable indent */
    });

    return (
      <ProjectItemVirtualizedRow
        {...props}
        key={key}
        items={result.get('items')}
        nextValues={projectsNextValues.get(currentProject.get('id'), Map({}))}
        actions={fnProjectItemsActions}
        moneyTypes={projectMoneyTypes}
        itemGrades={projectItemGrades}
        weaponTypes={projectWeaponTypes}
        localSettings={localSettings}
      />
    );
  }

  loadMoreRows({ startIndex, stopIndex }) {
    const { fnChangeFilterTakeSkip } = this.props;
    fnChangeFilterTakeSkip(stopIndex - startIndex + 1, startIndex);
    return Promise.delay(150);
  }

  render() {
    const {
      isLoggedIn,
      currentUser,
      currentProject,
      projectItemsPage,
      projectsImportsProcessingData,
      result,
      filter,
      fnChangeFilterSortBy,
      fnChangeFilterSortWay,
      fnChangeFilterWhereSearch,
      fnChangeFilterWhereType,
      fnLogoutCurrentUser,
    } = this.props;

    const {
      // project,
      isLoaded,
      isError,
      errorMessage,
      isLoading,
      id,
    } = projectItemsPage;

    return (
      <div>
        <Helmet>
          <title>ProjectItemsPage</title>
          <meta name="description" content="Description of ProjectItemsPage" />
        </Helmet>

        <Header
          currentProject={currentProject}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          projectsImportsProcessingData={projectsImportsProcessingData}
          onClickLogout={fnLogoutCurrentUser}
        />

        <Container>
          {isError && <Notification type="danger">{errorMessage}</Notification>}

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
                      total: <Label circular>{result.get('total')}</Label>,
                    }}
                  />
                </PageHeader>

                <ProjectItemsFilters
                  sortBy={filter.get('sortBy')}
                  sortWay={filter.get('sortWay')}
                  whereSearch={filter.getIn(['where', 'search'])}
                  whereType={filter.getIn(['where', 'type'])}
                  onChangeSortBy={fnChangeFilterSortBy}
                  onChangeSortWay={fnChangeFilterSortWay}
                  onChangeWhereSearch={fnChangeFilterWhereSearch}
                  onChangeWhereType={fnChangeFilterWhereType}
                />

                <FullheightThis>
                  <InfiniteAutoSizeList
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.loadMoreRows}
                    rowHeight={80}
                    rowRenderer={this.rowRenderer}
                    rowCount={result.get('total')}
                    ref={infiniteAutoSizeList => {
                      this.infiniteAutoSizeList = infiniteAutoSizeList;
                      return this.infiniteAutoSizeList;
                    }}
                  />
                </FullheightThis>
              </FullheightColumn>
            </Grid>
          )}
        </Container>
      </div>
    );
  }
}

ProjectItemsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectItemsPage: makeSelectProjectItemsPage(),
  isLoggedIn: makeSelectIsLoggedIn(),
  currentProject: makeSelectProject(),
  projectMoneyTypes: makeSelectProjectMoneyTypes(),
  projectItemGrades: makeSelectProjectItemGrades(),
  projectWeaponTypes: makeSelectProjectWeaponTypes(),
  currentUser: makeSelectCurrentUser(),
  projectsImportsProcessingData: makeSelectProjectsImportsProcessingData(),
  projectsNextValues: makeSelectProjectsNextValues(),
  result: makeSelectResult(),
  filter: makeSelectFilter(),
  localSettings: makeSelectLocalSettings(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fnLogoutCurrentUser: () => dispatch(logoutCurrentUser()),
    fnChangeId: id => dispatch(changeId(id)),
    fnResetResult: () => dispatch(resetResult()),
    fnChangeFilterTakeSkip: (take, skip) =>
      dispatch(changeFilterTakeSkip(take, skip)),
    fnChangeFilterSortBy: sortBy => dispatch(changeFilterSortBy(sortBy)),
    fnChangeFilterSortWay: sortWay => dispatch(changeFilterSortWay(sortWay)),
    fnChangeFilterWhereSearch: whereSearch =>
      dispatch(changeFilterWhereSearch(whereSearch)),
    fnChangeFilterWhereType: whereType =>
      dispatch(changeFilterWhereType(whereType)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'projectItemsPage', reducer });
const withSaga = injectSaga({ key: 'projectItemsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectItemsPage);
