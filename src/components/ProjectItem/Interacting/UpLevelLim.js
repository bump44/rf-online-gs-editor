/**
 *
 * ProjectItemInteractingUpLevelLim
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { parseInt, isFinite } from 'lodash';
import { Map } from 'immutable';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingUpLevelLim extends React.PureComponent {
  constructor(props) {
    super(props);

    this.getUpLevelLim = this.getUpLevelLim.bind(this);
    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      const value = parseInt(evt.target.value);

      // up to 1 from -1, down to -1 from 1
      const nextValue =
        value === 0 ? (this.getUpLevelLim() === -1 ? 1 : -1) : value; // eslint-disable-line

      onChangeValue(item, isFinite(nextValue) ? nextValue : -1);
    };
  }

  getUpLevelLim() {
    const { item, itemNextValues } = this.props;

    const nextValue = itemNextValues.getIn([
      'nextValue',
      'server',
      'nUpLevelLim',
    ]);

    const currValue = item.getIn(
      [['server', 'nUpLevelLim'], ['client', 'nUpLevelLim']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nUpLevelLim'],
      -1,
    );

    const value = nextValue !== undefined ? nextValue : currValue;
    return value;
  }

  render() {
    const value = this.getUpLevelLim();

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

ProjectItemInteractingUpLevelLim.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default ProjectItemInteractingUpLevelLim;
