/**
 *
 * ProjectItemInteractingClientCode
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Input } from 'semantic-ui-react';
import { getClientCodeAvoidError } from '../../../utils/converters';
import {
  getClientCode,
  getServerCode,
} from '../../../containers/App/getters/projectItem';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingClientCode extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, evt.target.value);
    };
  }

  render() {
    const { item, itemNextValues, size, className, label, fluid } = this.props;

    const value = getClientCode(itemNextValues.get('nextValue'), {
      entry: item,
    });

    const serverCode = getServerCode(itemNextValues.get('nextValue'), {
      entry: item,
    });

    const conv = getClientCodeAvoidError(serverCode);

    return (
      <Input
        error={!value || value.length !== 8 || value !== conv}
        size={size}
        fluid={fluid}
        type="text"
        value={value}
        onChange={this.changeValue}
        className={className}
        label={label}
      />
    );
  }
}

ProjectItemInteractingClientCode.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
  fluid: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
};

ProjectItemInteractingClientCode.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
  fluid: true,
};

export default ProjectItemInteractingClientCode;
