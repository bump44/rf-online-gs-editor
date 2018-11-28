/**
 *
 * ProjectItemSegmentSkillForces
 *
 */

import { Map } from 'immutable';
import { map } from 'lodash';
import { Segment, Grid, Divider, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import { getSkillForces } from '~/containers/App/getters/projectItem';
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
import ProjectSkillForceInteractingName from '../../SkillForce/Interacting/Name';
import ProjectSkillForceInteractingActableDst from '../../SkillForce/Interacting/ActableDst';
import ProjectSkillForceInteractingFixWeapon from '../../SkillForce/Interacting/FixWeapon';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemSegmentSkillForces extends React.PureComponent {
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

  renderRow(key, skillForceNextValues, skillForce) {
    const { skillForceActions } = this.props;

    return (
      <Segment key={key}>
        <ProjectSkillForceInteractingName
          skillForceNextValues={skillForceNextValues}
          skillForce={skillForce}
          onChangeValue={skillForceActions.changeName}
          className="mr-15"
          fluid={false}
        />
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
        <Grid columns="equal">
          <Grid.Column>
            <Header size="tiny">Actable Dst(s)</Header>
            {Array.from(Array(5)).map((_, index) => (
              <ProjectSkillForceInteractingActableDst
                key={`actableDst${index + 1}`}
                skillForceNextValues={skillForceNextValues}
                skillForce={skillForce}
                onChangeValue={skillForceActions.changeActableDstN}
                n={index + 1}
                className="mr-15 mb-5"
              />
            ))}
          </Grid.Column>
          <Grid.Column>
            <Header size="tiny">Fix Weapon(s)</Header>
            {Array.from(Array(16)).map((_, index) => (
              <ProjectSkillForceInteractingFixWeapon
                key={`fixWeapon${index + 1}`}
                skillForceNextValues={skillForceNextValues}
                skillForce={skillForce}
                onChangeValue={skillForceActions.changeFixWeaponN}
                n={index + 1}
                className="mr-15 mb-5"
              />
            ))}
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }

  render() {
    const { item, itemNextValues, nextValues } = this.props;

    const skillForces = getSkillForces(itemNextValues.get('nextValue'), {
      entry: item,
      nextValues,
    });

    return skillForces.map(skillForce =>
      this.renderRow(
        skillForce.get('id'),
        getNextValues(nextValues, skillForce),
        skillForce,
      ),
    );
  }
}

ProjectItemSegmentSkillForces.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  skillForceActions: PropTypes.object.isRequired,
};

export default ProjectItemSegmentSkillForces;
