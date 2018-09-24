/**
 *
 * ProjectItemInteractingLevelLim
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { parseInt } from 'lodash';
import { Map } from 'immutable';
import { Input } from 'semantic-ui-react';

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
    const { item, itemNextValues, className, size } = this.props;

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
      <Input
        size={size}
        fluid
        type="number"
        value={value}
        onChange={this.changeValue}
        className={className}
      />
    );
  }
}

ProjectItemInteractingLevelLim.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
};

ProjectItemInteractingLevelLim.defaultProps = {
  size: 'mini',
  className: '',
};

export default ProjectItemInteractingLevelLim;
