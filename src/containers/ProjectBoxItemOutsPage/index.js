/**
 *
 * ProjectBoxItemOutsPage
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
import { Grid, Header as PageHeader, Label } from 'semantic-ui-react';
import { IMMUTABLE_MAP, ITEM } from '../App/constants';
import { getRefs } from '../App/getters/project';

import {
  logoutCurrentUser,
  projectsBoxItemOutsBindActions,
  projectsItemsBindActions,
  projectsEntriesFinderItemsBindActions,
} from '../App/actions';

import {
  makeSelectIsLoggedIn,
  makeSelectCurrentUser,
  makeSelectLocalSettings,
  makeSelectProjectsNextValues,
  makeSelectProjectsImportsProcessingData,
  makeSelectProjectImportsProcessingData,
  makeSelectProjectsEntriesFinder,
} from '../App/selectors';

import makeSelectProjectBoxItemOutsPage, {
  makeSelectFilter,
} from './selectors';

import {
  resetResult,
  changeFilterTakeSkip,
  changeFilterSortBy,
  changeFilterSortWay,
  changeFilterWhereSearch,
  changeId,
} from './actions';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import ProjectBoxItemOutsFilters from '../../components/ProjectBoxItemOutsFilters';
import ProjectMenu from '../../components/ProjectMenu';
import Header from '../../components/Header';
import Container from '../../components/Container';
import Notification from '../../components/Notification';
import LoadingIndicator from '../../components/LoadingIndicator';
import FullheightColumn, {
  FullheightThis,
} from '../../components/FullheightColumn';
import InfiniteAutoSizeList from '../../components/InfiniteAutoSizeList';
import ProjectBoxItemOutVirtualizedRow from '../../components/ProjectBoxItemOutVirtualizedRow';

/* eslint-disable react/prefer-stateless-function */
export class ProjectBoxItemOutsPage extends React.Component {
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
    const { projectBoxItemOutsPage } = this.props;

    if (
      !projectBoxItemOutsPage
        .get('result')
        .get('items')
        .count() !==
        nextProps.projectBoxItemOutsPage
          .get('result')
          .get('items')
          .count() &&
      this.infiniteAutoSizeList
    ) {
      this.infiniteAutoSizeList.forceUpdateGrid();
    }
  }

  componentWillUnmount() {
    const { fnResetResult } = this.props;
    fnResetResult(); // clean state
  }

  getActionsBindPayload() {
    const {
      dispatch,
      match,
      projectBoxItemOutsPage,
      projectsNextValues,
    } = this.props;

    const project = projectBoxItemOutsPage.get('project') || IMMUTABLE_MAP;
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

  isRowLoaded({ index }) {
    const { projectBoxItemOutsPage } = this.props;
    return !!projectBoxItemOutsPage
      .get('result')
      .get('items')
      .get(index);
  }

  loadMoreRows({ startIndex, stopIndex }) {
    const { fnChangeFilterTakeSkip } = this.props;
    fnChangeFilterTakeSkip(stopIndex - startIndex + 1, startIndex);
    return Promise.delay(150);
  }

  loadProjectIfIdChanged(props, { isMount = false } = {}) {
    const id = props.projectBoxItemOutsPage.get('id');
    const { params } = props.match;

    const nextId = params.id;

    if (id !== nextId || isMount) {
      props.fnChangeId(nextId);
    }
  }

  rowRenderer({ key, ...props }) {
    const {
      projectBoxItemOutsPage,
      projectsNextValues,
      localSettings,
      projectsEntriesFinder,
      entriesFinderItemsActions,
    } = this.props;

    const result = projectBoxItemOutsPage.get('result');
    const project = projectBoxItemOutsPage.get('project');

    const actionsBindPayload = this.getActionsBindPayload();
    const {
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      buttonTypes,
    } = actionsBindPayload.additionalData;

    const boxItemOutActions = projectsBoxItemOutsBindActions(
      actionsBindPayload,
    );

    const itemActions = projectsItemsBindActions(actionsBindPayload);

    const nextValues =
      project && projectsNextValues.get(project.get('id'), IMMUTABLE_MAP);

    const entriesFinderItems =
      project &&
      projectsEntriesFinder.getIn([project.get('id'), ITEM], IMMUTABLE_MAP);

    return (
      <ProjectBoxItemOutVirtualizedRow
        {...props}
        key={key}
        boxItemOuts={result.get('items')}
        nextValues={nextValues}
        boxItemOutActions={boxItemOutActions}
        itemActions={itemActions}
        moneyTypes={moneyTypes}
        itemGradeTypes={itemGradeTypes}
        weaponTypes={weaponTypes}
        buttonTypes={buttonTypes}
        localSettings={localSettings}
        entriesFinderItems={entriesFinderItems}
        entriesFinderItemsActions={entriesFinderItemsActions}
      />
    );
  }

  render() {
    const {
      isLoggedIn,
      currentUser,
      filter,
      fnChangeFilterSortBy,
      fnChangeFilterSortWay,
      fnChangeFilterWhereSearch,
      fnChangeFilterWhereType,
      projectBoxItemOutsPage,
      onClickLogout,
      projectsImportsProcessingData,
      projectImportsProcessingData,
    } = this.props;

    const id = projectBoxItemOutsPage.get('id');
    const project = projectBoxItemOutsPage.get('project');
    const result = projectBoxItemOutsPage.get('result');
    const isLoading = projectBoxItemOutsPage.get('isLoading');
    const isLoaded = projectBoxItemOutsPage.get('isLoaded');
    const isError = projectBoxItemOutsPage.get('isError');
    const errorMessage = projectBoxItemOutsPage.get('errorMessage');

    return (
      <div>
        <Helmet>
          <title>ProjectBoxItemOutsPage</title>
          <meta
            name="description"
            content="Description of ProjectBoxItemOutsPage"
          />
        </Helmet>

        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          currentProject={project}
          onClickLogout={onClickLogout}
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
                  project={project}
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
                      title: project.get('title'),
                      total: <Label circular>{result.get('total')}</Label>,
                    }}
                  />
                </PageHeader>

                <ProjectBoxItemOutsFilters
                  sortBy={filter.get('sortBy')}
                  sortWay={filter.get('sortWay')}
                  whereSearch={filter.getIn(['where', 'search'])}
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

ProjectBoxItemOutsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
  currentUser: makeSelectCurrentUser(),
  filter: makeSelectFilter(),
  projectBoxItemOutsPage: makeSelectProjectBoxItemOutsPage(),
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
    onClickLogout: () => dispatch(logoutCurrentUser()),
    fnChangeId: payloadID => dispatch(changeId(payloadID)),
    fnResetResult: () => dispatch(resetResult()),
    fnChangeFilterTakeSkip: (take, skip) =>
      dispatch(changeFilterTakeSkip(take, skip)),
    fnChangeFilterSortBy: sortBy => dispatch(changeFilterSortBy(sortBy)),
    fnChangeFilterSortWay: sortWay => dispatch(changeFilterSortWay(sortWay)),
    fnChangeFilterWhereSearch: whereSearch =>
      dispatch(changeFilterWhereSearch(whereSearch)),
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

const withReducer = injectReducer({ key: 'projectBoxItemOutsPage', reducer });
const withSaga = injectSaga({ key: 'projectBoxItemOutsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectBoxItemOutsPage);
