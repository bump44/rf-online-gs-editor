/**
 *
 * ProjectItemInteractingSubType
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { parseInt } from 'lodash';
import { Map } from 'immutable';
import { Input } from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingSubType extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(evt.target.value) || 0);
    };
  }

  render() {
    const { item, itemNextValues, size, className } = this.props;

    const nextValue = itemNextValues.getIn(['nextValue', 'server', 'nSubType']);

    const currValue = item.getIn(
      [['server', 'nSubType'], ['client', 'nSubType']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nSubType'],
      0,
    );

    const value = nextValue !== undefined ? nextValue : currValue;

    return (
      <Input
        type="number"
        value={value}
        onChange={this.changeValue}
        size={size}
        className={className}
      />
    );
  }
}

ProjectItemInteractingSubType.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
};

ProjectItemInteractingSubType.defaultProps = {
  size: 'mini',
  className: '',
};

export default ProjectItemInteractingSubType;
