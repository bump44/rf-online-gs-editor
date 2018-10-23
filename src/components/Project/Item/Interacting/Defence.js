/**
 *
 * ProjectItemInteractingDefence
 *
 */

import { parseInt } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { Map /* , List */ } from 'immutable';
import { Input } from 'semantic-ui-react';
import { getDefFc } from 'containers/App/getters/projectItem';

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
    const { item, itemNextValues, className, size, label } = this.props;
    const value = getDefFc(itemNextValues.get('nextValue'), { entry: item });

    return (
      <Input
        size={size}
        fluid
        type="number"
        value={value}
        onChange={this.changeValue}
        className={className}
        label={label}
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
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
};

ProjectItemInteractingDefence.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
};

export default ProjectItemInteractingDefence;
