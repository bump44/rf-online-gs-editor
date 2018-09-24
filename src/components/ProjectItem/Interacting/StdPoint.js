/**
 *
 * ProjectItemInteractingStdPoint
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { parseInt } from 'lodash';
import { Map /* , List */ } from 'immutable';
import { Input } from 'semantic-ui-react';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingStdPoint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(evt.target.value.replace(/[^0-9]/g, '')));
    };
  }

  render() {
    const { item, itemNextValues, size, className } = this.props;

    const nextValue = itemNextValues.getIn([
      'nextValue',
      'server',
      'nStdPoint',
    ]);

    const currValue = item.getIn(
      [['server', 'nStdPoint'], ['client', 'nStdPoint']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nStdPoint'],
      0,
    );

    const value = (
      parseInt(nextValue !== undefined ? nextValue : currValue) || 0
    ).toLocaleString();

    return (
      <Input
        fluid
        size={size}
        className={className}
        value={value}
        onChange={this.changeValue}
      />
    );
  }
}

ProjectItemInteractingStdPoint.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
};

ProjectItemInteractingStdPoint.defaultProps = {
  size: 'mini',
  className: '',
};

export default ProjectItemInteractingStdPoint;
