/**
 *
 * ProjectItemInteractingDefenceFacing
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isFinite } from 'lodash';
import { Map /* , List */ } from 'immutable';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingDefenceFacing extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      const value = parseFloat(evt.target.value);
      onChangeValue(item, isFinite(value) && value >= 0 ? value : 0.5);
    };
  }

  render() {
    const { item, itemNextValues } = this.props;

    const nextValue = itemNextValues.getIn([
      'nextValue',
      'server',
      'fDefFacing',
    ]);

    const currValue = item.getIn(
      [['server', 'fDefFacing'], ['client', 'fDefFacing']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'fDefFacing'],
      1,
    );

    const value = nextValue !== undefined ? nextValue : currValue;

    return (
      <div className="field">
        <input
          className="input is-small"
          type="text"
          value={value}
          onChange={this.changeValue}
        />
      </div>
    );
  }
}

ProjectItemInteractingDefenceFacing.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default ProjectItemInteractingDefenceFacing;
