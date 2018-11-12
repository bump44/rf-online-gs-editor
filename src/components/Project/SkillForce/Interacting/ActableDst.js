/**
 *
 * ProjectSkillForceInteractingActableDst
 *
 */

import { Checkbox, Input } from 'semantic-ui-react';
import { isNull } from 'lodash';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getActableDst,
  getActableDstN,
} from '~/containers/App/getters/projectSkillForce';

import ProjectSkillForceFieldFormattedMessage from '../FieldFormattedMessage';

/* eslint-disable react/prefer-stateless-function */
class ProjectSkillForceInteractingActableDst extends React.PureComponent {
  constructor(props) {
    super(props);

    this.renderCheckbox = this.renderCheckbox.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.changeValue = (evt, owns) => {
      const { onChangeValue, skillForce, n } = this.props;
      onChangeValue(
        skillForce,
        isNull(n) ? evt.target.value : { value: owns.checked, n },
      );
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

    const value = getActableDst(skillForceNextValues.get('nextValue'), {
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

  renderCheckbox(message) {
    const { skillForce, skillForceNextValues, className, n } = this.props;

    const value = getActableDstN(
      skillForceNextValues.get('nextValue'),
      { entry: skillForce },
      { n },
    );

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
    const { n } = this.props;

    return (
      <ProjectSkillForceFieldFormattedMessage
        message={isNull(n) ? 'ActableDst' : `ActableDst${n}`}
      >
        {isNull(n) ? this.renderInput : this.renderCheckbox}
      </ProjectSkillForceFieldFormattedMessage>
    );
  }
}

ProjectSkillForceInteractingActableDst.propTypes = {
  skillForce: PropTypes.instanceOf(Map).isRequired,
  skillForceNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  n: PropTypes.oneOf([1, 2, 3, 4, 5]),
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

ProjectSkillForceInteractingActableDst.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
  fluid: true,
  withDefaultLabel: true,
  n: null,
};

export default ProjectSkillForceInteractingActableDst;
