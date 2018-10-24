/**
 *
 * ProjectMapSptInteractingMapNameType
 *
 */

import { Map, List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import { getMapName } from '~/containers/App/getters/projectMapSpt';
import ProjectInteractingMapNameType from '../../Interacting/MapNameType';

/* eslint-disable react/prefer-stateless-function */
class ProjectMapSptInteractingMapNameType extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = value => {
      const { onChangeValue, mapSpt } = this.props;
      onChangeValue(mapSpt, value);
    };
  }

  render() {
    const {
      mapSpt,
      mapSptNextValues,
      size,
      className,
      fluid,
      types,
    } = this.props;

    const value = getMapName(mapSptNextValues.get('nextValue'), {
      entry: mapSpt,
    });

    return (
      <ProjectInteractingMapNameType
        value={value}
        onChangeValue={this.changeValue}
        types={types}
        size={size}
        className={className}
        fluid={fluid}
      />
    );
  }
}

ProjectMapSptInteractingMapNameType.propTypes = {
  mapSpt: PropTypes.instanceOf(Map).isRequired,
  mapSptNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
  fluid: PropTypes.bool,
  types: PropTypes.instanceOf(List).isRequired,
};

ProjectMapSptInteractingMapNameType.defaultProps = {
  size: 'mini',
  className: '',
  fluid: true,
};

export default ProjectMapSptInteractingMapNameType;
