/**
 *
 * ProjectLayoutHoc
 *
 */

import React from 'react';
import { fromJS } from 'immutable';
import { Query } from 'react-apollo';

import { IMMUTABLE_MAP } from '../constants';
import ProjectQuery from '../../../apollo/queries/sub/project';
import LoadingIndicator from '../../../components/LoadingIndicator';
import Notification from '../../../components/Notification';
import Container from '../../../components/Container';
import Header from '../../../components/Header';

const withProject = ({
  selfLayout = true,
  selfIndicateLoading = true,
  selfIndicateError = true,
  query = ProjectQuery,
  variables = () => {},
  selectProject = data => data.get('project'),
} = {}) => WrappedComponent =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data: null };
      this.onCompleted = this.onCompleted.bind(this);
      this.renderQuery = this.renderQuery.bind(this);
    }

    onCompleted(data) {
      this.setState({ data: fromJS(data) });
    }

    renderQuery({ loading, error }) {
      if (loading && selfIndicateLoading) {
        return <LoadingIndicator />;
      }

      if (error && selfIndicateError) {
        return <Notification type="danger">{error.message}</Notification>;
      }

      const { state } = this;

      return (
        <WrappedComponent
          {...this.props}
          projectState={{ loading, error, data: state.data }}
        />
      );
    }

    render() {
      const { isLoggedIn, currentUser, onClickLogout } = this.props;
      const { data } = this.state;
      const project = selectProject(data || IMMUTABLE_MAP);

      const queryComponent = (
        <Query
          onCompleted={this.onCompleted}
          query={query}
          variables={variables(this.props)}
        >
          {this.renderQuery}
        </Query>
      );

      if (!selfLayout) {
        return queryComponent;
      }

      return (
        <React.Fragment>
          <Header
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            currentProject={project}
            onClickLogout={onClickLogout}
          />

          <Container>{queryComponent}</Container>
        </React.Fragment>
      );
    }
  };

export default withProject;
