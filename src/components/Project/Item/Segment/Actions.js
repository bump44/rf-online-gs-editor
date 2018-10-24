/**
 *
 * ProjectItemSegmentActions
 *
 */

import { getIsRemoved, getName } from '~/containers/App/getters/projectItem';
import { Map } from 'immutable';
import { Segment, Button, Confirm } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

const style = {
  confirmContent: {
    padding: '30px',
    textAlign: 'center',
    fontSize: '16px',
    borderTop: '6px solid #ea0000',
    borderBottom: '6px solid #ea0000',
  },
};

/* eslint-disable react/prefer-stateless-function */
class ProjectItemSegmentActions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { confirmFullyRemoveIsOpen: false };

    this.onClickFullyRemove = () =>
      this.setState({ confirmFullyRemoveIsOpen: true });
    this.onConfirmFullyRemoveCancel = () =>
      this.setState({ confirmFullyRemoveIsOpen: false });
    this.onConfirmFullyRemoveConfirm = () => {
      this.setState({ confirmFullyRemoveIsOpen: false }, () =>
        // eslint-disable-next-line
        this.props.itemActions.removeFully(this.props.item),
      );
    };
  }

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

    const { confirmFullyRemoveIsOpen } = this.state;

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

          <Button
            onClick={this.onClickFullyRemove}
            loading={itemNextValues.get('isRemoving', false)}
          >
            Fully Remove**
          </Button>

          <Confirm
            open={confirmFullyRemoveIsOpen}
            onConfirm={this.onConfirmFullyRemoveConfirm}
            onCancel={this.onConfirmFullyRemoveCancel}
            content={
              <div style={style.confirmContent}>
                Item{' '}
                <b>
                  {getName(itemNextValues.get('nextValue'), { entry: item })}
                </b>{' '}
                will be permanently deleted. Are you sure?
              </div>
            }
          />

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
