/**
 *
 * ProjectItemInteractingSubType
 *
 */

import { getSubType } from '~/containers/App/getters/projectItem';
import { Input } from 'semantic-ui-react';
import { Map } from 'immutable';
import { parseInt } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

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
    const value = getSubType(itemNextValues.get('nextValue'), { entry: item });

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
