/**
 *
 * ProjectItemInteractingDefenceFacingPresent
 *
 */

import { parseInt } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { Map /* , List */ } from 'immutable';
import { Input } from 'semantic-ui-react';

import {
  getDefenceFacingPresentValue,
  getDefenctFacingUnpresentValue,
} from 'utils/converters';

import { getDefGap, getDefFacing } from 'containers/App/getters/projectItem';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingDefenceFacingPresent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.getDefGap = this.getDefGap.bind(this);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      const value = getDefenctFacingUnpresentValue({
        presentValue: parseInt(evt.target.value),
        defGap: this.getDefGap(),
      });
      onChangeValue(item, value);
    };
  }

  getDefGap() {
    const { item, itemNextValues } = this.props;
    return getDefGap(itemNextValues.get('nextValue'), { entry: item });
  }

  render() {
    const { item, itemNextValues, size, className, label } = this.props;

    const value = getDefFacing(itemNextValues.get('nextValue'), {
      entry: item,
    });

    const present = getDefenceFacingPresentValue({
      defFacing: value,
      defGap: this.getDefGap(),
    });

    return (
      <Input
        size={size}
        fluid
        type="number"
        value={present}
        onChange={this.changeValue}
        className={className}
        label={label}
      />
    );
  }
}

ProjectItemInteractingDefenceFacingPresent.propTypes = {
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

ProjectItemInteractingDefenceFacingPresent.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
};

export default ProjectItemInteractingDefenceFacingPresent;
