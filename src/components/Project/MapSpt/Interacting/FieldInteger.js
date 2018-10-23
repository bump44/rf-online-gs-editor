/**
 *
 * ProjectMapSptInteractingFieldInteger
 *
 */

import { parseInt } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { Map /* , List */ } from 'immutable';
import { Input } from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
class ProjectMapSptInteractingFieldInteger extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, mapSpt } = this.props;
      onChangeValue(mapSpt, parseInt(evt.target.value.replace(/[^0-9]/g, '')));
    };
  }

  render() {
    const { size, className, label, value, fluid } = this.props;

    return (
      <Input
        fluid={fluid}
        size={size}
        className={className}
        value={value}
        onChange={this.changeValue}
        label={label}
      />
    );
  }
}

ProjectMapSptInteractingFieldInteger.propTypes = {
  mapSpt: PropTypes.instanceOf(Map).isRequired,
  // mapSptNextValues: PropTypes.instanceOf(Map).isRequired,
  value: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  fluid: PropTypes.bool,
};

ProjectMapSptInteractingFieldInteger.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
  fluid: true,
};

export default ProjectMapSptInteractingFieldInteger;
