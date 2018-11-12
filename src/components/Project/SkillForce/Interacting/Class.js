/**
 *
 * ProjectSkillForceInteractingClass
 *
 */

import { Input } from 'semantic-ui-react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import { getClass } from '~/containers/App/getters/projectSkillForce';
import ProjectSkillForceFieldFormattedMessage from '../FieldFormattedMessage';

/* eslint-disable react/prefer-stateless-function */
class ProjectSkillForceInteractingClass extends React.PureComponent {
  constructor(props) {
    super(props);

    this.renderInput = this.renderInput.bind(this);
    this.changeValue = evt => {
      const { onChangeValue, skillForce } = this.props;
      onChangeValue(skillForce, parseInt(evt.target.value, 10) || 0);
    };
  }

  renderInput(message) {
    const {
      skillForce,
      skillForceNextValues,
      className,
      label,
      fluid,
      size,
      withDefaultLabel,
    } = this.props;

    const value = getClass(skillForceNextValues.get('nextValue'), {
      entry: skillForce,
    });

    const labelProp = label || withDefaultLabel ? label || message : undefined;

    return (
      <Input
        label={labelProp}
        fluid={fluid}
        size={size}
        value={value}
        onChange={this.changeValue}
        className={className}
      />
    );
  }

  render() {
    return (
      <ProjectSkillForceFieldFormattedMessage message="Class">
        {this.renderInput}
      </ProjectSkillForceFieldFormattedMessage>
    );
  }
}

ProjectSkillForceInteractingClass.propTypes = {
  skillForce: PropTypes.instanceOf(Map).isRequired,
  skillForceNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
  fluid: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  withDefaultLabel: PropTypes.bool,
};

ProjectSkillForceInteractingClass.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
  fluid: true,
  withDefaultLabel: true,
};

export default ProjectSkillForceInteractingClass;
