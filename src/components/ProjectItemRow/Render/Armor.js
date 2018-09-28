/**
 *
 * ProjectItemRowRenderArmor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { Grid, Popup } from 'semantic-ui-react';

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
import ProjectItemInteractingDefence from '../../ProjectItem/Interacting/Defence';
import ProjectItemInteractingDefenceGap from '../../ProjectItem/Interacting/DefenceGap';
import ProjectItemInteractingDefenceFacing from '../../ProjectItem/Interacting/DefenceFacing';
import ProjectItemInteractingDefenceFacingPresent from '../../ProjectItem/Interacting/DefenceFacingPresent';
import ProjectItemInteractingUpLevelLim from '../../ProjectItem/Interacting/UpLevelLim';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRowRenderArmor extends React.PureComponent {
  render() {
    const {
      item,
      itemNextValues,
      itemActions,
      moneyTypes,
      itemGrades,
    } = this.props;

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
          <Grid columns={2}>
            <Grid.Column>
              <ProjectItemInteractingMoneyType
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={itemActions.changeMoney}
                types={moneyTypes}
                className="pt-5 pb-10"
              />
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
              <ProjectItemInteractingItemGrade
                item={item}
                itemNextValues={itemNextValues}
                onChangeValue={itemActions.changeItemGrade}
                types={itemGrades}
                className="pt-5 pb-10"
              />
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
          <Grid columns={3}>
            <Grid.Column width={4}>
              <Popup
                trigger={
                  <div className="pb-4">
                    <ProjectItemInteractingLevelLim
                      item={item}
                      itemNextValues={itemNextValues}
                      onChangeValue={itemActions.changeLevelLim}
                    />
                  </div>
                }
                inverted
                size="mini"
                position="top left"
                content={<FormattedMessage {...messages.Level} />}
              />
              <Popup
                trigger={
                  <div>
                    <ProjectItemInteractingDefenceGap
                      item={item}
                      itemNextValues={itemNextValues}
                      onChangeValue={itemActions.changeDefenceGap}
                    />
                  </div>
                }
                inverted
                size="mini"
                position="bottom left"
                content={<FormattedMessage {...messages.DefenceGap} />}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <Popup
                trigger={
                  <div className="pb-4">
                    <ProjectItemInteractingUpLevelLim
                      item={item}
                      itemNextValues={itemNextValues}
                      onChangeValue={itemActions.changeUpLevelLim}
                    />
                  </div>
                }
                inverted
                size="mini"
                position="top left"
                content={<FormattedMessage {...messages.UpLevelLim} />}
              />
              <Popup
                trigger={
                  <div>
                    <ProjectItemInteractingDefenceFacingPresent
                      item={item}
                      itemNextValues={itemNextValues}
                      onChangeValue={itemActions.changeDefenceFacing}
                    />
                  </div>
                }
                inverted
                size="mini"
                position="bottom left"
                content={
                  <FormattedMessage {...messages.DefenceFacingPresent} />
                }
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <Popup
                trigger={
                  <div className="pb-4">
                    <ProjectItemInteractingDefence
                      item={item}
                      itemNextValues={itemNextValues}
                      onChangeValue={itemActions.changeDefence}
                    />
                  </div>
                }
                inverted
                size="mini"
                position="top left"
                content={<FormattedMessage {...messages.Defence} />}
              />
              <Popup
                trigger={
                  <div>
                    <ProjectItemInteractingDefenceFacing
                      item={item}
                      itemNextValues={itemNextValues}
                      onChangeValue={itemActions.changeDefenceFacing}
                    />
                  </div>
                }
                inverted
                size="mini"
                position="bottom left"
                content={<FormattedMessage {...messages.DefenceFacing} />}
              />
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

ProjectItemRowRenderArmor.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGrades: PropTypes.instanceOf(List).isRequired,
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
    changeItemGrade: PropTypes.func.isRequired,
    changeLevelLim: PropTypes.func.isRequired,
    changeUpLevelLim: PropTypes.func.isRequired,
    changeDefence: PropTypes.func.isRequired,
    changeDefenceGap: PropTypes.func.isRequired,
    changeDefenceFacing: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProjectItemRowRenderArmor;
