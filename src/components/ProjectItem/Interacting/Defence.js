/**
 *
 * ProjectItemInteractingDefence
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
class ProjectItemInteractingDefence extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(evt.target.value) || 0);
    };
  }

  render() {
    const { item, itemNextValues, className, size } = this.props;

    const nextValue = itemNextValues.getIn(
      [
        ['nextValue', 'server', 'nDefFc'],
        ['nextValue', 'server', 'fDefFc'], // because server store defence value as a float type but value must be used integer
      ].find(fieldSets => itemNextValues.getIn(fieldSets) !== undefined) || [
        'nextValue',
        'server',
        'nDefFc',
      ],
    );

    const currValue = item.getIn(
      [['server', 'nDefFc'], ['server', 'fDefFc'], ['client', 'nDefFc']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nDefFc'],
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

ProjectItemInteractingDefence.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
};

ProjectItemInteractingDefence.defaultProps = {
  size: 'mini',
  className: '',
};

export default ProjectItemInteractingDefence;
