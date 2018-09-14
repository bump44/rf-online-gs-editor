/**
 *
 * ProjectItemRowInteractingStoragePossible
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map /* , List */ } from 'immutable';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRowInteractingStoragePossible extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, evt.target.checked);
    };
  }

  render() {
    const { item, itemNextValues } = this.props;

    const nextValue = itemNextValues.getIn([
      'nextValue',
      'server',
      'bStoragePossible',
    ]);

    const currValue = item.getIn(
      [['server', 'bStoragePossible'], ['client', 'bStoragePossible']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'bStoragePossible'],
      false,
    );

    const value = nextValue !== undefined ? nextValue : currValue;

    return (
      <label className="checkbox is-small">
        <input
          type="checkbox"
          value={1}
          checked={!!value}
          onChange={this.changeValue}
        />
        <FormattedMessage {...messages.StoragePossible} />
      </label>
    );
  }
}

ProjectItemRowInteractingStoragePossible.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default ProjectItemRowInteractingStoragePossible;
