/**
 *
 * ProjectItemSegmentActions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Segment, Button } from 'semantic-ui-react';
import { getIsRemoved } from '../../../containers/App/getters/projectItem';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemSegmentActions extends React.PureComponent {
  onClickVirtualRemove = () =>
    // eslint-disable-next-line
    this.props.itemActions.removeVirtual(this.props.item);

  onClickVirtualRestore = () =>
    // eslint-disable-next-line
    this.props.itemActions.restoreVirtual(this.props.item);

  render() {
    const { itemNextValues, item } = this.props;
    const isRemoved = getIsRemoved(itemNextValues.get('nextValue'), {
      entry: item,
    });

    return (
      <React.Fragment>
        {itemNextValues.get('isError', false) && (
          <Segment color="red" inverted>
            {itemNextValues.get('errorMessage', '')}
          </Segment>
        )}
        <Segment>
          {!isRemoved && (
            <Button
              loading={itemNextValues.get('isRemoving', false)}
              onClick={this.onClickVirtualRemove}
            >
              Virtual Remove*
            </Button>
          )}
          {isRemoved && (
            <Button
              loading={itemNextValues.get('isRestoring', false)}
              onClick={this.onClickVirtualRestore}
            >
              Virtual Restore*
            </Button>
          )}

          <Button>Fully Remove**</Button>
          <Button>Copy</Button>
          <Button>Copy & Redirect</Button>
        </Segment>
        <Segment>
          <div>
            * This action will mark the item as deleted, you can restore it at
            any time. But in the export the values of the item will be set to
            zero.
          </div>
          <div>
            ** The item will be completely deleted, and its index and code will
            be available.
          </div>
        </Segment>
      </React.Fragment>
    );
  }
}

ProjectItemSegmentActions.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  itemActions: PropTypes.object.isRequired,
};

export default ProjectItemSegmentActions;
