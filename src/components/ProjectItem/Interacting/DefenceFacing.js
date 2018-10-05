/**
 *
 * ProjectItemInteractingDefenceFacing
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isFinite } from 'lodash';
import { Map /* , List */ } from 'immutable';
import { Input } from 'semantic-ui-react';
import { getDefFacing } from '../../../containers/App/getters/projectItem';

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
    const { item, itemNextValues, size, className } = this.props;
    const value = getDefFacing(itemNextValues.get('nextValue'), {
      entry: item,
    });

    return (
      <Input
        size={size}
        fluid
        type="text"
        value={value}
        onChange={this.changeValue}
        className={className}
      />
    );
  }
}

ProjectItemInteractingDefenceFacing.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
};

ProjectItemInteractingDefenceFacing.defaultProps = {
  size: 'mini',
  className: '',
};

export default ProjectItemInteractingDefenceFacing;
