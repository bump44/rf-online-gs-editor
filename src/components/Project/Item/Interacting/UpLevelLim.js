/**
 *
 * ProjectItemInteractingUpLevelLim
 *
 */

import { getUpLevel } from '~/containers/App/getters/projectItem';
import { Input } from 'semantic-ui-react';
import { Map } from 'immutable';
import { parseInt, isFinite } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

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
    return getUpLevel(itemNextValues.get('nextValue'), { entry: item });
  }

  render() {
    const value = this.getUpLevelLim();
    const { className, size, label } = this.props;

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

ProjectItemInteractingUpLevelLim.propTypes = {
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

ProjectItemInteractingUpLevelLim.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
};

export default ProjectItemInteractingUpLevelLim;
