/**
 *
 * ProjectItemSegmentBasicArmor
 *
 */

import { Grid, Header, Segment } from 'semantic-ui-react';
import { Map, List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import ProjectItemInteractingCivilA from '../Interacting/CivilA';
import ProjectItemInteractingCivilBF from '../Interacting/CivilBF';
import ProjectItemInteractingCivilBM from '../Interacting/CivilBM';
import ProjectItemInteractingCivilCF from '../Interacting/CivilCF';
import ProjectItemInteractingCivilCM from '../Interacting/CivilCM';
import ProjectItemInteractingDefence from '../Interacting/Defence';
import ProjectItemInteractingDefenceFacing from '../Interacting/DefenceFacing';
import ProjectItemInteractingDefenceFacingPresent from '../Interacting/DefenceFacingPresent';
import ProjectItemInteractingDefenceGap from '../Interacting/DefenceGap';
import ProjectItemInteractingExchange from '../Interacting/Exchange';
import ProjectItemInteractingGoldPoint from '../Interacting/GoldPoint';
import ProjectItemInteractingGround from '../Interacting/Ground';
import ProjectItemInteractingItemGrade from '../Interacting/ItemGrade';
import ProjectItemInteractingKillPoint from '../Interacting/KillPoint';
import ProjectItemInteractingLevelLim from '../Interacting/LevelLim';
import ProjectItemInteractingMoneyType from '../Interacting/MoneyType';
import ProjectItemInteractingMoneyValue from '../Interacting/MoneyValue';
import ProjectItemInteractingName from '../Interacting/Name';
import ProjectItemInteractingProcPoint from '../Interacting/ProcPoint';
import ProjectItemInteractingSell from '../Interacting/Sell';
import ProjectItemInteractingStdPoint from '../Interacting/StdPoint';
import ProjectItemInteractingStdPrice from '../Interacting/StdPrice';
import ProjectItemInteractingStoragePossible from '../Interacting/StoragePossible';
import ProjectItemInteractingStoragePrice from '../Interacting/StoragePrice';
import ProjectItemInteractingUpLevelLim from '../Interacting/UpLevelLim';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemSegmentBasicArmor extends React.PureComponent {
  constructor(props) {
    super(props);

    this.renderNames = this.renderNames.bind(this);
    this.renderTransfers = this.renderTransfers.bind(this);
    this.renderCivils = this.renderCivils.bind(this);
    this.renderCurrentMoney = this.renderCurrentMoney.bind(this);
    this.renderAllMoneyFields = this.renderAllMoneyFields.bind(this);
    this.renderLevels = this.renderLevels.bind(this);
    this.renderDefences = this.renderDefences.bind(this);
  }

  renderNames() {
    const { item, itemNextValues, itemActions, itemGradeTypes } = this.props;
    return (
      <div>
        <ProjectItemInteractingName
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeName}
          className="mb-15"
          label={
            <ProjectItemInteractingItemGrade
              item={item}
              itemNextValues={itemNextValues}
              onChangeValue={itemActions.changeItemGrade}
              className="mr-15 mb-5"
              types={itemGradeTypes}
            />
          }
        />
      </div>
    );
  }

  renderTransfers() {
    const { item, itemNextValues, itemActions } = this.props;
    return (
      <div>
        <ProjectItemInteractingExchange
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeExchange}
          className="mr-15 mb-5"
        />
        <ProjectItemInteractingSell
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeSell}
          className="mr-15 mb-5"
        />
        <ProjectItemInteractingGround
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeGround}
          className="mr-15 mb-5"
        />
        <ProjectItemInteractingStoragePossible
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeStoragePossible}
          className="mr-15 mb-5"
        />
      </div>
    );
  }

  renderCivils() {
    const { item, itemNextValues, itemActions } = this.props;
    return (
      <div>
        <ProjectItemInteractingCivilBM
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeCivilBM}
          className="mr-15 mb-5"
        />
        <ProjectItemInteractingCivilBF
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeCivilBF}
          className="mr-15 mb-5"
        />
        <ProjectItemInteractingCivilCM
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeCivilCM}
          className="mr-15 mb-5"
        />
        <ProjectItemInteractingCivilCF
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeCivilCF}
          className="mr-15 mb-5"
        />
        <ProjectItemInteractingCivilA
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeCivilA}
          className="mr-15 mb-5"
        />
      </div>
    );
  }

  renderCurrentMoney() {
    const { item, itemNextValues, itemActions, moneyTypes } = this.props;
    return (
      <div>
        <ProjectItemInteractingMoneyValue
          item={item}
          itemNextValues={itemNextValues}
          onChangeStdPrice={itemActions.changeStdPrice}
          onChangeStdPoint={itemActions.changeStdPoint}
          onChangeGoldPoint={itemActions.changeGoldPoint}
          onChangeProcPoint={itemActions.changeProcPoint}
          onChangeKillPoint={itemActions.changeKillPoint}
          types={moneyTypes}
          className="mb-5"
          label={
            <ProjectItemInteractingMoneyType
              item={item}
              itemNextValues={itemNextValues}
              onChangeValue={itemActions.changeMoney}
              types={moneyTypes}
            />
          }
        />
      </div>
    );
  }

  renderAllMoneyFields() {
    const { item, itemNextValues, itemActions, moneyTypes } = this.props;
    return (
      <div>
        <ProjectItemInteractingStdPrice
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeStdPrice}
          label="StdPrice"
          className="mb-5"
        />
        <ProjectItemInteractingStdPoint
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeStdPoint}
          label="StdPoint"
          className="mb-5"
        />
        <ProjectItemInteractingGoldPoint
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeGoldPoint}
          label="GoldPoint"
          className="mb-5"
        />
        <ProjectItemInteractingProcPoint
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeProcPoint}
          label="ProcPoint"
          className="mb-5"
        />
        <ProjectItemInteractingKillPoint
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeKillPoint}
          label="KillPoint"
          className="mb-5"
        />
        <ProjectItemInteractingStoragePrice
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeStoragePrice}
          types={moneyTypes}
          label="Storage price"
        />
      </div>
    );
  }

  renderLevels() {
    const { item, itemNextValues, itemActions } = this.props;
    return (
      <div>
        <ProjectItemInteractingLevelLim
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeLevelLim}
          label="LevelLim"
          className="mb-5"
        />
        <ProjectItemInteractingUpLevelLim
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeLevelLim}
          label="UpLevelLim"
        />
      </div>
    );
  }

  renderDefences() {
    const { item, itemNextValues, itemActions } = this.props;
    return (
      <div>
        <ProjectItemInteractingDefence
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeDefence}
          className="mb-5"
          label="Defence"
        />
        <ProjectItemInteractingDefenceGap
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeDefenceGap}
          className="mb-5"
          label="DefenceGap"
        />
        <ProjectItemInteractingDefenceFacing
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeDefenceFacing}
          className="mb-5"
          label="DefenceFacing"
        />
        <ProjectItemInteractingDefenceFacingPresent
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeDefenceFacing}
          label="DefenceFacingPresent"
        />
      </div>
    );
  }

  render() {
    return (
      <Segment>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={7} verticalAlign="top">
              {this.renderNames()}
              <Header size="tiny">Transfer & Civil permissions</Header>
              {this.renderTransfers()}
              {this.renderCivils()}
              <Header size="tiny">Levels</Header>
              {this.renderLevels()}
              <Header size="tiny">Defences</Header>
              {this.renderDefences()}
            </Grid.Column>
            <Grid.Column width={9} verticalAlign="top">
              <Header size="tiny">Current money type & value</Header>
              {this.renderCurrentMoney()}
              <Header size="tiny">All money fields</Header>
              {this.renderAllMoneyFields()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

ProjectItemSegmentBasicArmor.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  itemActions: PropTypes.shape({
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
    changeItemGrade: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProjectItemSegmentBasicArmor;
