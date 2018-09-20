/**
 *
 * ProjectItemRenderTool
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from '../messages';

import ProjectItemInteractingName from '../Interacting/Name';
import ProjectItemInteractingExchange from '../Interacting/Exchange';
import ProjectItemInteractingSell from '../Interacting/Sell';
import ProjectItemInteractingGround from '../Interacting/Ground';
import ProjectItemInteractingStoragePossible from '../Interacting/StoragePossible';
import ProjectItemInteractingMoneyType from '../Interacting/MoneyType';
import ProjectItemInteractingMoneyValue from '../Interacting/MoneyValue';
import ProjectItemInteractingStoragePrice from '../Interacting/StoragePrice';
import ProjectItemInteractingCivilBM from '../Interacting/CivilBM';
import ProjectItemInteractingCivilBF from '../Interacting/CivilBF';
import ProjectItemInteractingCivilCM from '../Interacting/CivilCM';
import ProjectItemInteractingCivilCF from '../Interacting/CivilCF';
import ProjectItemInteractingCivilA from '../Interacting/CivilA';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRenderTool extends React.PureComponent {
  render() {
    const { item, itemNextValues, actions, moneyTypes } = this.props;

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
          <ProjectItemInteractingMoneyType
            item={item}
            itemNextValues={itemNextValues}
            onChangeValue={actions.changeMoney}
            types={moneyTypes}
          />

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
          <div className="field is-grouped is-grouped-multiline">
            <div className="control mb-0">
              <ProjectItemInteractingCivilBM
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeCivilBM}
              />
            </div>
            <div className="control mb-0">
              <ProjectItemInteractingCivilBF
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeCivilBF}
              />
            </div>
            <div className="control mb-0">
              <ProjectItemInteractingCivilCM
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeCivilCM}
              />
            </div>
            <div className="control mb-0">
              <ProjectItemInteractingCivilCF
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeCivilCF}
              />
            </div>
            <div className="control mb-0">
              <ProjectItemInteractingCivilA
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={actions.changeCivilA}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectItemRenderTool.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
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
    changeCivilBM: PropTypes.func.isRequired,
    changeCivilBF: PropTypes.func.isRequired,
    changeCivilCM: PropTypes.func.isRequired,
    changeCivilCF: PropTypes.func.isRequired,
    changeCivilA: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProjectItemRenderTool;
