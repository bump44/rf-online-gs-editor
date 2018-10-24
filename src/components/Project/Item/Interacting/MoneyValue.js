/**
 *
 * ProjectItemInteractingMoneyValue
 *
 */

import { getMoneyType } from '~/containers/App/getters/projectItem';
import { Map, List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import GoldPoint from './GoldPoint';
import KillPoint from './KillPoint';
import ProcPoint from './ProcPoint';
import StdPoint from './StdPoint';
import StdPrice from './StdPrice';

const InteractingComponents = {
  nStdPrice: StdPrice,
  nStdPoint: StdPoint,
  nGoldPoint: GoldPoint,
  nProcPoint: ProcPoint,
  nKillPoint: KillPoint,
};

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingMoneyValue extends React.PureComponent {
  render() {
    const {
      item,
      itemNextValues,
      types,
      onChangeStdPrice,
      onChangeStdPoint,
      onChangeGoldPoint,
      onChangeProcPoint,
      onChangeKillPoint,
      className,
      label,
      labelled,
    } = this.props;

    const onChangeCallbacks = {
      nStdPrice: onChangeStdPrice,
      nStdPoint: onChangeStdPoint,
      nGoldPoint: onChangeGoldPoint,
      nProcPoint: onChangeProcPoint,
      nKillPoint: onChangeKillPoint,
    };

    // money type
    const type = getMoneyType(itemNextValues.get('nextValue'), {
      entry: item,
      moneyTypes: types,
    });

    const isUnknown = !type;

    if (isUnknown) {
      return null;
    }

    const InteractingComponent = InteractingComponents[type.get('fieldName')];

    if (!InteractingComponent) {
      return null; // impossible ;)
    }

    return (
      <InteractingComponent
        title={type.get('title')}
        item={item}
        itemNextValues={itemNextValues}
        types={itemNextValues}
        type={type}
        onChangeValue={onChangeCallbacks[type.get('fieldName')]}
        className={className}
        label={labelled ? type.get('title') : label}
      />
    );
  }
}

ProjectItemInteractingMoneyValue.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeStdPrice: PropTypes.func.isRequired,
  onChangeStdPoint: PropTypes.func.isRequired,
  onChangeGoldPoint: PropTypes.func.isRequired,
  onChangeProcPoint: PropTypes.func.isRequired,
  onChangeKillPoint: PropTypes.func.isRequired,
  types: PropTypes.instanceOf(List).isRequired,
  className: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  labelled: PropTypes.bool,
};

ProjectItemInteractingMoneyValue.defaultProps = {
  className: '',
  label: null,
  labelled: false,
};

export default ProjectItemInteractingMoneyValue;
