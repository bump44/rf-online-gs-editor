/**
 *
 * ProjectItemInteractingMoneyValue
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from '../messages';

import StdPrice from './StdPrice';
import StdPoint from './StdPoint';
import GoldPoint from './GoldPoint';
import ProcPoint from './ProcPoint';
import KillPoint from './KillPoint';

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
    const nextValue = itemNextValues.getIn(['nextValue', 'server', 'nMoney']);

    const currValue = item.getIn(
      [['server', 'nMoney'], ['client', 'nMoney']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nMoney'],
      0,
    );

    const value = nextValue !== undefined ? nextValue : currValue;

    const type = types.find(val => val.get('value') === value);
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
