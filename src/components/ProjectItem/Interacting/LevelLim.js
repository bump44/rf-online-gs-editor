/**
 *
 * ProjectItemInteractingLevelLim
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { parseInt } from 'lodash';
import { Map } from 'immutable';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingLevelLim extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(evt.target.value) || 0);
    };
  }

  render() {
    const { item, itemNextValues } = this.props;

    const nextValue = itemNextValues.getIn([
      'nextValue',
      'server',
      'nLevelLim',
    ]);

    const currValue = item.getIn(
      [['server', 'nLevelLim'], ['client', 'nLevelLim']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nLevelLim'],
      0,
    );

    const value = nextValue !== undefined ? nextValue : currValue;

    return (
      <div className="field">
        <input
          className="input is-small"
          type="number"
          value={value}
          onChange={this.changeValue}
        />
      </div>
    );
  }
}

ProjectItemInteractingLevelLim.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default ProjectItemInteractingLevelLim;
