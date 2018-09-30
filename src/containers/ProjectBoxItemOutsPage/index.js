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
import { Grid, Header as PageHeader } from 'semantic-ui-react';
import { IMMUTABLE_LIST, IMMUTABLE_MAP } from '../App/constants';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
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

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  logoutCurrentUser,
  projectsBoxItemOutsBindActions,
} from '../App/actions';

import {
  makeSelectIsLoggedIn,
  makeSelectCurrentUser,
  makeSelectLocalSettings,
  makeSelectProjectsNextValues,
} from '../App/selectors';
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
    const { dispatch, match, projectBoxItemOutsPage } = this.props;
    const project = projectBoxItemOutsPage.get('project');

    const additionalData = (() => {
      if (!project) {
        return {};
      }

      return {
        moneyTypes: project.getIn(['moneyTypes', 'items'], IMMUTABLE_LIST),
        itemGrades: project.getIn(['itemGrades', 'items'], IMMUTABLE_LIST),
        weaponTypes: project.getIn(['weaponTypes', 'items'], IMMUTABLE_LIST),
        buttonTypes: project.getIn(['buttonTypes', 'items'], IMMUTABLE_LIST),
      };
    })();

    return {
      dispatch,
      projectId: match.params.id,
      additionalData,
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
    } = this.props;

    const result = projectBoxItemOutsPage.get('result');
    const project = projectBoxItemOutsPage.get('project');

    const actionsBindPayload = this.getActionsBindPayload();
    const {
      moneyTypes,
      itemGrades,
      weaponTypes,
      buttonTypes,
    } = actionsBindPayload.additionalData;

    const boxItemOutActions = projectsBoxItemOutsBindActions(
      actionsBindPayload,
    );

    const nextValues =
      project && projectsNextValues.get(project.get('id'), IMMUTABLE_MAP);

    return (
      <ProjectBoxItemOutVirtualizedRow
        {...props}
        key={key}
        boxItemOuts={result.get('items')}
        nextValues={nextValues}
        boxItemOutActions={boxItemOutActions}
        moneyTypes={moneyTypes}
        itemGrades={itemGrades}
        weaponTypes={weaponTypes}
        buttonTypes={buttonTypes}
        localSettings={localSettings}
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
                />
              </Grid.Column>
              <FullheightColumn largeScreen={13} widescreen={14}>
                <PageHeader>
                  <FormattedMessage
                    {...messages.header}
                    values={{ title: project.get('title') }}
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
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onClickLogout: () => dispatch(logoutCurrentUser()),
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

const withReducer = injectReducer({ key: 'projectBoxItemOutsPage', reducer });
const withSaga = injectSaga({ key: 'projectBoxItemOutsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectBoxItemOutsPage);
