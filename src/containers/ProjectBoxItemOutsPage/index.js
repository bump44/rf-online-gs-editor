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

import withProject from '../App/hocs/withProject';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import { makeSelectFilter } from './selectors';
import {
  resetResult,
  changeFilterTakeSkip,
  changeFilterSortBy,
  changeFilterSortWay,
  changeFilterWhereSearch,
} from './actions';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { logoutCurrentUser } from '../App/actions';
import { makeSelectIsLoggedIn, makeSelectCurrentUser } from '../App/selectors';
import ProjectBoxItemOutsFilters from '../../components/ProjectBoxItemOutsFilters';
import ProjectMenu from '../../components/ProjectMenu';

/* eslint-disable react/prefer-stateless-function */
export class ProjectBoxItemOutsPage extends React.Component {
  render() {
    const {
      isLoggedIn,
      currentUser,
      projectState,
      filter,
      fnChangeFilterSortBy,
      fnChangeFilterSortWay,
      fnChangeFilterWhereSearch,
      fnChangeFilterWhereType,
    } = this.props;
    const project = projectState.data.get('project');

    return (
      <div>
        <Helmet>
          <title>ProjectBoxItemOutsPage</title>
          <meta
            name="description"
            content="Description of ProjectBoxItemOutsPage"
          />
        </Helmet>

        <Grid columns={2}>
          <Grid.Column largeScreen={3} widescreen={2}>
            <ProjectMenu
              isLoggedIn={isLoggedIn}
              project={project}
              projectId={project.get('id')}
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
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onClickLogout: () => dispatch(logoutCurrentUser()),
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
  withProject({
    variables: ({
      match: {
        params: { id },
      },
    }) => ({
      id,
    }),
  }),
)(ProjectBoxItemOutsPage);
