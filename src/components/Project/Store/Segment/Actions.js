/**
 *
 * ProjectStoreSegmentActions
 *
 */

import { Map } from 'immutable';
import { Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import Notification from '~/components/Notification';
import withActions from '../HOC/Actions';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreSegmentActions extends React.PureComponent {
  render() {
    const { storeNextValues, storeWrappedActions } = this.props;

    return (
      <Segment>
        {storeNextValues.get('isError') && (
          <Notification type="danger">
            {storeNextValues.get('errorMessage')}
          </Notification>
        )}

        <Button
          primary
          onClick={storeWrappedActions.copyAndRedirect}
          loading={storeNextValues.get('isCopying')}
        >
          Copy & Redirect
        </Button>
      </Segment>
    );
  }
}

ProjectStoreSegmentActions.propTypes = {
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  storeWrappedActions: PropTypes.shape({
    copyAndRedirect: PropTypes.func.isRequired,
  }).isRequired,
};

export default withActions(ProjectStoreSegmentActions);
