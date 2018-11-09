/**
 *
 * ProjectItemSegmentPotionEffects
 *
 */

import { Map } from 'immutable';
import { map } from 'lodash';
import { Segment, Grid, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import { getPotionItemEffect } from '~/containers/App/getters/projectItem';
import { getNextValues } from '~/containers/App/getters/nextValues';

import ProjectPotionItemEffectInteractingActivate from '../../PotionItemEffect/Interacting/Activate';
import ProjectPotionItemEffectInteractingCumulType from '../../PotionItemEffect/Interacting/CumulType';
import ProjectPotionItemEffectInteractingEnable from '../../PotionItemEffect/Interacting/Enable';
import ProjectPotionItemEffectInteractingFixshield from '../../PotionItemEffect/Interacting/Fixshield';
import ProjectPotionItemEffectInteractingNeedHP from '../../PotionItemEffect/Interacting/NeedHP';
import ProjectPotionItemEffectInteractingNeedFP from '../../PotionItemEffect/Interacting/NeedFP';
import ProjectPotionItemEffectInteractingNeedSP from '../../PotionItemEffect/Interacting/NeedSP';
import ProjectPotionItemEffectInteractingNeedItemCode from '../../PotionItemEffect/Interacting/NeedItemCode';
import ProjectPotionItemEffectInteractingNeedItemCount from '../../PotionItemEffect/Interacting/NeedItemCount';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemSegmentPotionEffects extends React.PureComponent {
  renderCheckboxes(potionItemEffectNextValues, potionItemEffect) {
    const { potionItemEffectActions } = this.props;

    const components = {
      ProjectPotionItemEffectInteractingActivate,
      ProjectPotionItemEffectInteractingCumulType,
      ProjectPotionItemEffectInteractingEnable,
      ProjectPotionItemEffectInteractingFixshield,
    };

    return (
      <React.Fragment>
        {map(components, (Component, key) => (
          <Component
            key={key}
            potionItemEffect={potionItemEffect}
            potionItemEffectNextValues={potionItemEffectNextValues}
            onChangeValue={
              potionItemEffectActions[
                `change${key.replace('ProjectPotionItemEffectInteracting', '')}`
              ]
            }
            className="mr-15"
          />
        ))}
      </React.Fragment>
    );
  }

  render() {
    const {
      item,
      itemNextValues,
      potionItemEffectActions,
      nextValues,
    } = this.props;

    const potionItemEffect = getPotionItemEffect(
      itemNextValues.get('nextValue'),
      { entry: item, nextValues },
    );

    const potionItemEffectNextValues = getNextValues(
      nextValues,
      potionItemEffect,
    );

    return (
      <Segment>
        {this.renderCheckboxes(potionItemEffectNextValues, potionItemEffect)}
        <Divider />
        <Grid columns="equal">
          <Grid.Column>
            <div className="mb-15">
              <ProjectPotionItemEffectInteractingNeedHP
                potionItemEffectNextValues={potionItemEffectNextValues}
                potionItemEffect={potionItemEffect}
                onChangeValue={potionItemEffectActions.changeNeedHP}
              />
            </div>
            <div className="mb-15">
              <ProjectPotionItemEffectInteractingNeedFP
                potionItemEffectNextValues={potionItemEffectNextValues}
                potionItemEffect={potionItemEffect}
                onChangeValue={potionItemEffectActions.changeNeedFP}
              />
            </div>
            <div className="mb-15">
              <ProjectPotionItemEffectInteractingNeedSP
                potionItemEffectNextValues={potionItemEffectNextValues}
                potionItemEffect={potionItemEffect}
                onChangeValue={potionItemEffectActions.changeNeedSP}
              />
            </div>
          </Grid.Column>
          <Grid.Column>
            {Array.from(Array(3)).map((_, index) => (
              <Grid columns="equal" key={`needItem${index + 1}`}>
                <Grid.Column>
                  <ProjectPotionItemEffectInteractingNeedItemCode
                    potionItemEffectNextValues={potionItemEffectNextValues}
                    potionItemEffect={potionItemEffect}
                    onChangeValue={potionItemEffectActions.changeNeedItemCode}
                    n={index + 1}
                  />
                </Grid.Column>
                <Grid.Column>
                  <ProjectPotionItemEffectInteractingNeedItemCount
                    potionItemEffectNextValues={potionItemEffectNextValues}
                    potionItemEffect={potionItemEffect}
                    onChangeValue={potionItemEffectActions.changeNeedItemCount}
                    n={index + 1}
                  />
                </Grid.Column>
              </Grid>
            ))}
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

ProjectItemSegmentPotionEffects.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  potionItemEffectActions: PropTypes.object.isRequired,
};

export default ProjectItemSegmentPotionEffects;
