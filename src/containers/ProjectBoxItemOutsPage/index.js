/**
 *
 * ProjectBoxItemOutsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, Header as PageHeader } from 'semantic-ui-react';

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

import { logoutCurrentUser } from '../App/actions';
import { makeSelectIsLoggedIn, makeSelectCurrentUser } from '../App/selectors';
import ProjectBoxItemOutsFilters from '../../components/ProjectBoxItemOutsFilters';
import ProjectMenu from '../../components/ProjectMenu';
import Header from '../../components/Header';
import Container from '../../components/Container';
import Notification from '../../components/Notification';
import LoadingIndicator from '../../components/LoadingIndicator';

/* eslint-disable react/prefer-stateless-function */
export class ProjectBoxItemOutsPage extends React.Component {
  componentWillMount() {
    this.loadProjectIfIdChanged(this.props, { isMount: true });
  }

  componentWillReceiveProps(nextProps) {
    this.loadProjectIfIdChanged(nextProps);
  }

  loadProjectIfIdChanged(props, { isMount = false } = {}) {
    const id = props.projectBoxItemOutsPage.get('id');
    const { params } = props.match;

    const nextId = params.id;

    if (id !== nextId || isMount) {
      props.fnChangeId(nextId);
    }
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
              <Grid.Column largeScreen={13} widescreen={14}>
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
              </Grid.Column>
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
