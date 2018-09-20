/**
 *
 * ProjectItemPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import makeSelectProjectItemPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ProjectItemPage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>ProjectItemPage</title>
          <meta name="description" content="Description of ProjectItemPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ProjectItemPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectitempage: makeSelectProjectItemPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
