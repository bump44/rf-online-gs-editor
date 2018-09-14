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

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import makeSelectProjectItemsPage, {
  makeSelectProject,
  makeSelectResult,
  makeSelectFilter,
  makeSelectProjectMoneyTypes,
} from './selectors';

import {
  makeSelectProjectsImportsProcessingData,
  makeSelectCurrentUser,
  makeSelectIsLoggedIn,
  makeSelectProjectsNextValues,
} from '../App/selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { projectsItemsBindActions } from '../App/actions';
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
    this.loadProjectIfIdChanged(this.props);
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

  loadProjectIfIdChanged(props) {
    const { id } = props.projectItemsPage;
    const { match } = props;
    const { params } = match;

    const nextId = params.id;

    if (id !== nextId) {
      props.fnChangeId(nextId);
    }
  }

  isRowLoaded({ index }) {
    const { result } = this.props;
    return !!result.get('items').get(index);
  }

  rowRenderer({ key, ...props }) {
    const {
      result,
      fnProjectItemsActions,
      currentProject,
      projectsNextValues,
      projectMoneyTypes,
    } = this.props;

    return (
      <ProjectItemVirtualizedRow
        {...props}
        key={key}
        items={result.get('items')}
        nextValues={projectsNextValues.get(currentProject.get('id'), Map({}))}
        actions={fnProjectItemsActions}
        moneyTypes={projectMoneyTypes}
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
        />

        <div className="container is-fluid p-10">
          {isError && (
            <Notification className="is-danger">{errorMessage}</Notification>
          )}

          {isLoading && <LoadingIndicator />}

          {isLoaded && (
            <div className="columns is-fullheight calc-50px">
              <div className="column is-2">
                <ProjectMenu
                  isLoggedIn={isLoggedIn}
                  project={currentProject}
                  projectId={id}
                  currentUser={currentUser}
                />
              </div>
              <div className="column" style={styles.column}>
                <p className="title is-4">
                  <FormattedMessage
                    {...messages.header}
                    values={{
                      title: currentProject.get(
                        'title',
                        currentProject.get('name'),
                      ),
                      total: (
                        <small className="tag is-small is-info">
                          {result.get('total')}
                        </small>
                      ),
                    }}
                  />
                </p>

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

                <div className="card" style={styles.card}>
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
                </div>
              </div>
            </div>
          )}
        </div>
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
  currentUser: makeSelectCurrentUser(),
  projectsImportsProcessingData: makeSelectProjectsImportsProcessingData(),
  projectsNextValues: makeSelectProjectsNextValues(),
  result: makeSelectResult(),
  filter: makeSelectFilter(),
});

function mapDispatchToProps(dispatch, props) {
  return {
    dispatch,
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
    fnProjectItemsActions: projectsItemsBindActions({
      dispatch,
      projectId: props.match.params.id,
    }),
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

const styles = {
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    display: 'flex',
    flex: '1 100%',
    flexDirection: 'row',
  },
};
