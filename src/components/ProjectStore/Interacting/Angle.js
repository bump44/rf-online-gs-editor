/**
 *
 * ProjectStoreInteractingAngle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Input } from 'semantic-ui-react';
import * as projectStore from '../../../containers/App/getters/projectStore';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreInteractingAngle extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, store } = this.props;
      onChangeValue(store, parseFloat(evt.target.value) || 1);
    };
  }

  render() {
    const {
      store,
      storeNextValues,
      size,
      className,
      label,
      fluid,
    } = this.props;

    const value = projectStore.getAngle(storeNextValues.get('nextValue'), {
      store,
    });

    return (
      <Input
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

ProjectStoreInteractingAngle.propTypes = {
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
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

ProjectStoreInteractingAngle.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
  fluid: true,
};

export default ProjectStoreInteractingAngle;
