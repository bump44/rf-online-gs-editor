/**
 *
 * ProjectItemInteractingDefenceGap
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isFinite } from 'lodash';
import { Map /* , List */ } from 'immutable';
import { Input } from 'semantic-ui-react';
import { getDefGap } from '../../../containers/App/getters/projectItem';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingDefenceGap extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      const value = parseFloat(evt.target.value);
      onChangeValue(item, isFinite(value) && value >= 0 ? value : 0.5);
    };
  }

  render() {
    const { item, itemNextValues, size, className, label } = this.props;
    const value = getDefGap(itemNextValues.get('nextValue'), { entry: item });

    return (
      <Input
        size={size}
        fluid
        type="text"
        value={value}
        onChange={this.changeValue}
        className={className}
        label={label}
      />
    );
  }
}

ProjectItemInteractingDefenceGap.propTypes = {
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

ProjectItemInteractingDefenceGap.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
};

export default ProjectItemInteractingDefenceGap;
