/**
 *
 * ProjectStoresPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Promise from 'bluebird';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, Label, Header as PageHeader } from 'semantic-ui-react';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  makeSelectIsLoggedIn,
  makeSelectCurrentUser,
  makeSelectProjectsImportsProcessingData,
  makeSelectProjectsNextValues,
  makeSelectLocalSettings,
  makeSelectProjectImportsProcessingData,
} from '../App/selectors';

import { logoutCurrentUser, projectsStoresBindActions } from '../App/actions';
import {
  changeId,
  resetResult,
  changeFilterTakeSkip,
  changeFilterSortBy,
  changeFilterSortWay,
  changeFilterWhereSearch,
} from './actions';

import makeSelectProjectStoresPage, {
  makeSelectProject,
  makeSelectResult,
  makeSelectFilter,
} from './selectors';

import Header from '../../components/Header';
import Container from '../../components/Container';
import Notification from '../../components/Notification';
import LoadingIndicator from '../../components/LoadingIndicator';
import ProjectMenu from '../../components/ProjectMenu';
import FullheightColumn, {
  FullheightThis,
} from '../../components/FullheightColumn';
import InfiniteAutoSizeList from '../../components/InfiniteAutoSizeList';
import ProjectStoreVirtualizedRow from '../../components/ProjectStoreVirtualizedRow';
import ProjectStoresFilters from '../../components/ProjectStoresFilters';
import { IMMUTABLE_MAP, IMMUTABLE_LIST } from '../App/constants';

/* eslint-disable react/prefer-stateless-function */
export class ProjectStoresPage extends React.Component {
  constructor(props) {
    super(props);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
    this.getActionsBindPayload = this.getActionsBindPayload.bind(this);
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
    const { id } = props.projectStoresPage;
    const { match } = props;
    const { params } = match;

    const nextId = params.id;

    if (id !== nextId || isMount) {
      props.fnChangeId(nextId);
      props.fnResetResult(); // clean state
    }
  }

  getActionsBindPayload() {
    const { dispatch, match, currentProject } = this.props;
    const additionalData = (() => {
      if (!currentProject) {
        return {};
      }

      return {
        moneyTypes: currentProject.getIn(
          ['moneyTypes', 'items'],
          IMMUTABLE_LIST,
        ),
        itemGrades: currentProject.getIn(
          ['itemGrades', 'items'],
          IMMUTABLE_LIST,
        ),
        weaponTypes: currentProject.getIn(
          ['weaponTypes', 'items'],
          IMMUTABLE_LIST,
        ),
      };
    })();

    return {
      dispatch,
      projectId: match.params.id,
      additionalData,
    };
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
      localSettings,
    } = this.props;

    const actionsBindPayload = this.getActionsBindPayload();
    const {
      moneyTypes,
      itemGrades,
      weaponTypes,
    } = actionsBindPayload.additionalData;

    const storeActions = projectsStoresBindActions(actionsBindPayload);
    const nextValues =
      currentProject &&
      projectsNextValues.get(currentProject.get('id'), IMMUTABLE_MAP);

    return (
      <ProjectStoreVirtualizedRow
        {...props}
        key={key}
        stores={result.get('items')}
        nextValues={nextValues}
        storeActions={storeActions}
        moneyTypes={moneyTypes}
        itemGrades={itemGrades}
        weaponTypes={weaponTypes}
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
      projectsImportsProcessingData,
      fnLogoutCurrentUser,
      projectStoresPage,
      result,
      filter,
      fnChangeFilterSortBy,
      fnChangeFilterSortWay,
      fnChangeFilterWhereSearch,
      projectImportsProcessingData,
    } = this.props;

    const {
      isLoaded,
      isError,
      errorMessage,
      isLoading,
      id,
    } = projectStoresPage;

    return (
      <div>
        <Helmet>
          <title>ProjectStoresPage</title>
          <meta name="description" content="Description of ProjectStoresPage" />
        </Helmet>

        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          currentProject={currentProject}
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
                      total: <Label circular>{result.get('total')}</Label>,
                    }}
                  />
                </PageHeader>

                <ProjectStoresFilters
                  sortBy={filter.get('sortBy')}
                  sortWay={filter.get('sortWay')}
                  whereSearch={filter.getIn(['where', 'search'])}
                  onChangeSortBy={fnChangeFilterSortBy}
                  onChangeSortWay={fnChangeFilterSortWay}
                  onChangeWhereSearch={fnChangeFilterWhereSearch}
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

ProjectStoresPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  localSettings: makeSelectLocalSettings(),
  projectStoresPage: makeSelectProjectStoresPage(),
  isLoggedIn: makeSelectIsLoggedIn(),
  currentUser: makeSelectCurrentUser(),
  currentProject: makeSelectProject(),
  projectsImportsProcessingData: makeSelectProjectsImportsProcessingData(),
  projectsNextValues: makeSelectProjectsNextValues(),
  result: makeSelectResult(),
  filter: makeSelectFilter(),
  projectImportsProcessingData: (
    state,
    {
      match: {
        params: { id },
      },
    },
  ) => makeSelectProjectImportsProcessingData(id)(state),
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'projectStoresPage', reducer });
const withSaga = injectSaga({ key: 'projectStoresPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectStoresPage);
