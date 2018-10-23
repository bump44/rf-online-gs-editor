/**
 *
 * ProjectItemRowRenderTool
 *
 */

import { Grid } from 'semantic-ui-react';
import { Map, List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import ProjectItemInteractingCivilA from '../../Item/Interacting/CivilA';
import ProjectItemInteractingCivilBF from '../../Item/Interacting/CivilBF';
import ProjectItemInteractingCivilBM from '../../Item/Interacting/CivilBM';
import ProjectItemInteractingCivilCF from '../../Item/Interacting/CivilCF';
import ProjectItemInteractingCivilCM from '../../Item/Interacting/CivilCM';
import ProjectItemInteractingExchange from '../../Item/Interacting/Exchange';
import ProjectItemInteractingGround from '../../Item/Interacting/Ground';
import ProjectItemInteractingMoneyType from '../../Item/Interacting/MoneyType';
import ProjectItemInteractingMoneyValue from '../../Item/Interacting/MoneyValue';
import ProjectItemInteractingName from '../../Item/Interacting/Name';
import ProjectItemInteractingSell from '../../Item/Interacting/Sell';
import ProjectItemInteractingStoragePossible from '../../Item/Interacting/StoragePossible';
import ProjectItemInteractingStoragePrice from '../../Item/Interacting/StoragePrice';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRowRenderTool extends React.PureComponent {
  render() {
    const { item, itemNextValues, itemActions, moneyTypes } = this.props;

    return (
      <Grid columns={3}>
        <Grid.Column largeScreen={4} widescreen={5}>
          <ProjectItemInteractingName
            item={item}
            itemNextValues={itemNextValues}
            onChangeValue={itemActions.changeName}
            className="pb-10"
          />
          <Grid columns="equal">
            <Grid.Column>
              <ProjectItemInteractingExchange
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={itemActions.changeExchange}
              />
            </Grid.Column>
            <Grid.Column>
              <ProjectItemInteractingSell
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={itemActions.changeSell}
              />
            </Grid.Column>
            <Grid.Column only="widescreen">
              <ProjectItemInteractingGround
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={itemActions.changeGround}
              />
            </Grid.Column>
            <Grid.Column only="widescreen">
              <ProjectItemInteractingStoragePossible
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={itemActions.changeStoragePossible}
              />
            </Grid.Column>
          </Grid>
        </Grid.Column>

        <Grid.Column largeScreen={6} widescreen={7}>
          <ProjectItemInteractingMoneyType
            item={item}
            itemNextValues={itemNextValues}
            onChangeValue={itemActions.changeMoney}
            types={moneyTypes}
            className="pt-5 pb-10"
          />

          <Grid columns={2}>
            <Grid.Column>
              <ProjectItemInteractingMoneyValue
                item={item}
                itemNextValues={itemNextValues}
                onChangeStdPrice={itemActions.changeStdPrice}
                onChangeStdPoint={itemActions.changeStdPoint}
                onChangeGoldPoint={itemActions.changeGoldPoint}
                onChangeProcPoint={itemActions.changeProcPoint}
                onChangeKillPoint={itemActions.changeKillPoint}
                types={moneyTypes}
              />
            </Grid.Column>
            <Grid.Column>
              <ProjectItemInteractingStoragePrice
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={itemActions.changeStoragePrice}
                types={moneyTypes}
              />
            </Grid.Column>
          </Grid>
        </Grid.Column>

        <Grid.Column largeScreen={6} widescreen={4}>
          <Grid columns={2}>
            <Grid.Column>
              <ProjectItemInteractingCivilBM
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={itemActions.changeCivilBM}
              />
              <ProjectItemInteractingCivilCM
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={itemActions.changeCivilCM}
              />
              <ProjectItemInteractingCivilA
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={itemActions.changeCivilA}
              />
            </Grid.Column>
            <Grid.Column>
              <ProjectItemInteractingCivilBF
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={itemActions.changeCivilBF}
              />

              <ProjectItemInteractingCivilCF
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={itemActions.changeCivilCF}
              />
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

ProjectItemRowRenderTool.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
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
  }).isRequired,
};

export default ProjectItemRowRenderTool;
