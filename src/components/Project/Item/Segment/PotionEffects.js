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

import ProjectSkillForceInteractingActivate from '../../SkillForce/Interacting/Activate';
import ProjectSkillForceInteractingCumulType from '../../SkillForce/Interacting/CumulType';
import ProjectSkillForceInteractingEnable from '../../SkillForce/Interacting/Enable';
import ProjectSkillForceInteractingFixshield from '../../SkillForce/Interacting/Fixshield';
import ProjectSkillForceInteractingNeedHP from '../../SkillForce/Interacting/NeedHP';
import ProjectSkillForceInteractingNeedFP from '../../SkillForce/Interacting/NeedFP';
import ProjectSkillForceInteractingNeedSP from '../../SkillForce/Interacting/NeedSP';
import ProjectSkillForceInteractingNeedItemCode from '../../SkillForce/Interacting/NeedItemCode';
import ProjectSkillForceInteractingNeedItemCount from '../../SkillForce/Interacting/NeedItemCount';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemSegmentPotionEffects extends React.PureComponent {
  renderCheckboxes(skillForceNextValues, skillForce) {
    const { skillForceActions } = this.props;

    const components = {
      ProjectSkillForceInteractingActivate,
      ProjectSkillForceInteractingCumulType,
      ProjectSkillForceInteractingEnable,
      ProjectSkillForceInteractingFixshield,
    };

    return (
      <React.Fragment>
        {map(components, (Component, key) => (
          <Component
            key={key}
            skillForce={skillForce}
            skillForceNextValues={skillForceNextValues}
            onChangeValue={
              skillForceActions[
                `change${key.replace('ProjectSkillForceInteracting', '')}`
              ]
            }
            className="mr-15"
          />
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { item, itemNextValues, skillForceActions, nextValues } = this.props;

    const skillForce = getPotionItemEffect(itemNextValues.get('nextValue'), {
      entry: item,
      nextValues,
    });

    const skillForceNextValues = getNextValues(nextValues, skillForce);

    return (
      <Segment>
        {this.renderCheckboxes(skillForceNextValues, skillForce)}
        <Divider />
        <Grid columns="equal">
          <Grid.Column>
            <div className="mb-15">
              <ProjectSkillForceInteractingNeedHP
                skillForceNextValues={skillForceNextValues}
                skillForce={skillForce}
                onChangeValue={skillForceActions.changeNeedHP}
              />
            </div>
            <div className="mb-15">
              <ProjectSkillForceInteractingNeedFP
                skillForceNextValues={skillForceNextValues}
                skillForce={skillForce}
                onChangeValue={skillForceActions.changeNeedFP}
              />
            </div>
            <div className="mb-15">
              <ProjectSkillForceInteractingNeedSP
                skillForceNextValues={skillForceNextValues}
                skillForce={skillForce}
                onChangeValue={skillForceActions.changeNeedSP}
              />
            </div>
          </Grid.Column>
          <Grid.Column>
            {Array.from(Array(3)).map((_, index) => (
              <Grid columns="equal" key={`needItem${index + 1}`}>
                <Grid.Column>
                  <ProjectSkillForceInteractingNeedItemCode
                    skillForceNextValues={skillForceNextValues}
                    skillForce={skillForce}
                    onChangeValue={skillForceActions.changeNeedItemCode}
                    n={index + 1}
                  />
                </Grid.Column>
                <Grid.Column>
                  <ProjectSkillForceInteractingNeedItemCount
                    skillForceNextValues={skillForceNextValues}
                    skillForce={skillForce}
                    onChangeValue={skillForceActions.changeNeedItemCount}
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
  skillForceActions: PropTypes.object.isRequired,
};

export default ProjectItemSegmentPotionEffects;
