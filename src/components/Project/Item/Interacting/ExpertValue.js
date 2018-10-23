/**
 *
 * ProjectItemInteractingExpertValue
 *
 */

import { parseInt } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { Map /* , List */ } from 'immutable';
import { Input } from 'semantic-ui-react';
import {
  getExpertValue,
  getExpertTypeValueIsDisabled,
} from 'containers/App/getters/projectItem';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingExpertValue extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item, n } = this.props;
      onChangeValue(item, { value: parseInt(evt.target.value) || -1, n });
    };
  }

  render() {
    const {
      item,
      itemNextValues,
      size,
      className,
      label,
      fluid,
      n,
    } = this.props;

    const value = getExpertValue(
      itemNextValues.get('nextValue'),
      { entry: item },
      { n },
    );

    const isDisabled = getExpertTypeValueIsDisabled(
      itemNextValues.get('nextValue'),
      { entry: item },
      { n },
    );

    return (
      <Input
        fluid={fluid}
        size={size}
        className={className}
        value={value}
        onChange={this.changeValue}
        label={label}
        type="number"
        min="-1"
        max="99"
        disabled={isDisabled}
      />
    );
  }
}

ProjectItemInteractingExpertValue.propTypes = {
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
  n: PropTypes.oneOf([1, 2]).isRequired,
  fluid: PropTypes.bool,
};

ProjectItemInteractingExpertValue.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
  fluid: true,
};

export default ProjectItemInteractingExpertValue;
