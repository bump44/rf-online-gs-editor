/**
 *
 * ProjectStoreInteractingMapNameType
 *
 */

import { Map, List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import { getMapCode } from '~/containers/App/getters/projectStore';
import ProjectInteractingMapNameType from '../../Interacting/MapNameType';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreInteractingMapNameType extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = value => {
      const { onChangeValue, store } = this.props;
      onChangeValue(store, value);
    };
  }

  render() {
    const {
      store,
      storeNextValues,
      size,
      className,
      fluid,
      disabled,
      types,
    } = this.props;

    const value = getMapCode(storeNextValues.get('nextValue'), {
      entry: store,
    });

    return (
      <ProjectInteractingMapNameType
        value={value}
        onChangeValue={this.changeValue}
        types={types}
        size={size}
        className={className}
        fluid={fluid}
        disabled={disabled}
      />
    );
  }
}

ProjectStoreInteractingMapNameType.propTypes = {
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
  fluid: PropTypes.bool,
  disabled: PropTypes.bool,
  types: PropTypes.instanceOf(List).isRequired,
};

ProjectStoreInteractingMapNameType.defaultProps = {
  size: 'mini',
  className: '',
  fluid: true,
  disabled: false,
};

export default ProjectStoreInteractingMapNameType;
