/**
 *
 * ProjectSkillForceInteractingUsableRaceAF
 *
 */

import { Checkbox } from 'semantic-ui-react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import { getUsableRaceAF } from '~/containers/App/getters/projectSkillForce';
import ProjectSkillForceFieldFormattedMessage from '../FieldFormattedMessage';

/* eslint-disable react/prefer-stateless-function */
class ProjectSkillForceInteractingUsableRaceAF extends React.PureComponent {
  constructor(props) {
    super(props);

    this.renderCheckbox = this.renderCheckbox.bind(this);
    this.changeValue = (evt, owns) => {
      const { onChangeValue, skillForce } = this.props;
      onChangeValue(skillForce, owns.checked);
    };
  }

  renderCheckbox(message) {
    const { skillForce, skillForceNextValues, className } = this.props;

    const value = getUsableRaceAF(skillForceNextValues.get('nextValue'), {
      entry: skillForce,
    });

    return (
      <Checkbox
        label={message}
        value={1}
        checked={!!value}
        onChange={this.changeValue}
        className={className}
      />
    );
  }

  render() {
    return (
      <ProjectSkillForceFieldFormattedMessage message="UsableRaceAF">
        {this.renderCheckbox}
      </ProjectSkillForceFieldFormattedMessage>
    );
  }
}

ProjectSkillForceInteractingUsableRaceAF.propTypes = {
  skillForce: PropTypes.instanceOf(Map).isRequired,
  skillForceNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ProjectSkillForceInteractingUsableRaceAF.defaultProps = {
  className: '',
};

export default ProjectSkillForceInteractingUsableRaceAF;
