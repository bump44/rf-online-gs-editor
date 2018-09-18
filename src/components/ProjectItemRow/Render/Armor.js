/**
 *
 * ProjectItemRowRenderArmor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

import ProjectItemInteractingName from '../../ProjectItem/Interacting/Name';
import ProjectItemInteractingExchange from '../../ProjectItem/Interacting/Exchange';
import ProjectItemInteractingSell from '../../ProjectItem/Interacting/Sell';
import ProjectItemInteractingGround from '../../ProjectItem/Interacting/Ground';
import ProjectItemInteractingStoragePossible from '../../ProjectItem/Interacting/StoragePossible';
import ProjectItemInteractingMoneyType from '../../ProjectItem/Interacting/MoneyType';
import ProjectItemInteractingMoneyValue from '../../ProjectItem/Interacting/MoneyValue';
import ProjectItemInteractingStoragePrice from '../../ProjectItem/Interacting/StoragePrice';
import ProjectItemInteractingItemGrade from '../../ProjectItem/Interacting/ItemGrade';
import ProjectItemInteractingLevelLim from '../../ProjectItem/Interacting/LevelLim';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRowRenderArmor extends React.PureComponent {
  render() {
    const {
      item,
      itemNextValues,
      actions,
      moneyTypes,
      itemGrades,
    } = this.props;

    return (
      <div className="columns">
        <div className="column">
          <ProjectItemInteractingName
            item={item}
            itemNextValues={itemNextValues}
            onChangeValue={actions.changeName}
          />
          <div className="field is-grouped">
            <div className="control">
              <ProjectItemInteractingExchange
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeExchange}
              />
            </div>
            <div className="control">
              <ProjectItemInteractingSell
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeSell}
              />
            </div>
            <div className="control">
              <ProjectItemInteractingGround
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeGround}
              />
            </div>
            <div className="control">
              <ProjectItemInteractingStoragePossible
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeStoragePossible}
              />
            </div>
          </div>
        </div>

        <div className="column">
          <div className="field is-grouped">
            <div className="control is-expanded">
              <ProjectItemInteractingMoneyType
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeMoney}
                types={moneyTypes}
              />
            </div>
            <div className="control pr-3">
              <ProjectItemInteractingItemGrade
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeItemGrade}
                types={itemGrades}
              />
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <ProjectItemInteractingMoneyValue
                item={item}
                itemNextValues={itemNextValues}
                onChangeStdPrice={actions.changeStdPrice}
                onChangeStdPoint={actions.changeStdPoint}
                onChangeGoldPoint={actions.changeGoldPoint}
                onChangeProcPoint={actions.changeProcPoint}
                onChangeKillPoint={actions.changeKillPoint}
                types={moneyTypes}
              />
            </div>
            <div className="column is-hidden-touch is-hidden-desktop-only is-hidden-widescreen-only">
              <ProjectItemInteractingStoragePrice
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeStoragePrice}
                types={moneyTypes}
              />
            </div>
          </div>
        </div>

        <div className="column">
          <div className="field is-horizontal">
            <div className="field-label is-small">
              <label className="label">
                <FormattedMessage {...messages.Level} />:
              </label>
            </div>
            <div className="field-body">
              <ProjectItemInteractingLevelLim
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeLevelLim}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectItemRowRenderArmor.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGrades: PropTypes.instanceOf(List).isRequired,
  actions: PropTypes.shape({
    changeName: PropTypes.func.isRequired,
    changeExchange: PropTypes.func.isRequired,
    changeSell: PropTypes.func.isRequired,
    changeGround: PropTypes.func.isRequired,
    changeStoragePossible: PropTypes.func.isRequired,
    changeMoney: PropTypes.func.isRequired,
    changeStdPrice: PropTypes.func.isRequired,
    changeStdPoint: PropTypes.func.isRequired,
    changeGoldPoint: PropTypes.func.isRequired,
    changeProcPoint: PropTypes.func.isRequired,
    changeKillPoint: PropTypes.func.isRequired,
    changeStoragePrice: PropTypes.func.isRequired,
    changeItemGrade: PropTypes.func.isRequired,
    changeLevelLim: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProjectItemRowRenderArmor;
