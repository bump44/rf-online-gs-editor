/**
 *
 * ProjectItemRowInteractingKillPoint
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { parseInt } from 'lodash';
import { Map /* , List */ } from 'immutable';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRowInteractingKillPoint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(evt.target.value.replace(/[^0-9]/g, '')));
    };
  }

  render() {
    const { item, itemNextValues } = this.props;

    const nextValue = itemNextValues.getIn([
      'nextValue',
      'server',
      'nKillPoint',
    ]);

    const currValue = item.getIn(
      [['server', 'nKillPoint'], ['client', 'nKillPoint']].find(
        fieldSets => !!item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nKillPoint'],
      0,
    );

    const value = (
      parseInt(nextValue !== undefined ? nextValue : currValue) || 0
    ).toLocaleString();

    return (
      <input
        className="input is-small"
        type="text"
        value={value}
        onChange={this.changeValue}
      />
    );
  }
}

ProjectItemRowInteractingKillPoint.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default ProjectItemRowInteractingKillPoint;
