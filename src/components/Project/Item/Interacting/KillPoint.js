/**
 *
 * ProjectItemInteractingKillPoint
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { parseInt } from 'lodash';
import { Map /* , List */ } from 'immutable';
import { Input } from 'semantic-ui-react';
import { getKillPoint } from '../../../containers/App/getters/projectItem';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingKillPoint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(evt.target.value.replace(/[^0-9]/g, '')));
    };
  }

  render() {
    const { item, itemNextValues, size, className, label } = this.props;

    const value = getKillPoint(itemNextValues.get('nextValue'), {
      entry: item,
    }).toLocaleString();

    return (
      <Input
        fluid
        size={size}
        className={className}
        value={value}
        onChange={this.changeValue}
        label={label}
      />
    );
  }
}

ProjectItemInteractingKillPoint.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
};

ProjectItemInteractingKillPoint.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
};

export default ProjectItemInteractingKillPoint;
