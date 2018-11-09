/**
 *
 * ProjectItemSegmentBasic
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
import ProjectItemInteractingExchange from '../Interacting/Exchange';
import ProjectItemInteractingGoldPoint from '../Interacting/GoldPoint';
import ProjectItemInteractingGround from '../Interacting/Ground';
import ProjectItemInteractingKillPoint from '../Interacting/KillPoint';
import ProjectItemInteractingMoneyType from '../Interacting/MoneyType';
import ProjectItemInteractingMoneyValue from '../Interacting/MoneyValue';
import ProjectItemInteractingName from '../Interacting/Name';
import ProjectItemInteractingProcPoint from '../Interacting/ProcPoint';
import ProjectItemInteractingSell from '../Interacting/Sell';
import ProjectItemInteractingStdPoint from '../Interacting/StdPoint';
import ProjectItemInteractingStdPrice from '../Interacting/StdPrice';
import ProjectItemInteractingStoragePossible from '../Interacting/StoragePossible';
import ProjectItemInteractingStoragePrice from '../Interacting/StoragePrice';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemSegmentBasic extends React.PureComponent {
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
    const { item, itemNextValues, itemActions } = this.props;
    return (
      <div>
        <ProjectItemInteractingName
          item={item}
          itemNextValues={itemNextValues}
          onChangeValue={itemActions.changeName}
          className="mb-15"
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

ProjectItemSegmentBasic.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemActions: PropTypes.object.isRequired,
};

export default ProjectItemSegmentBasic;
