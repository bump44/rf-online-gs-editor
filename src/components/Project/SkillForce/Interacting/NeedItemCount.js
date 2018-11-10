/**
 *
 * ProjectSkillForceInteractingNeedItemCount
 *
 */

import { Input } from 'semantic-ui-react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import { getNeedItemCount } from '~/containers/App/getters/projectSkillForce';
import ProjectSkillForceFieldFormattedMessage from '../FieldFormattedMessage';

/* eslint-disable react/prefer-stateless-function */
class ProjectSkillForceInteractingNeedItemCount extends React.PureComponent {
  constructor(props) {
    super(props);

    this.renderInput = this.renderInput.bind(this);
    this.changeValue = evt => {
      const { onChangeValue, skillForce, n } = this.props;
      onChangeValue(skillForce, {
        value: parseInt(evt.target.value, 10) || 0,
        n,
      });
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
      n,
    } = this.props;

    const value = getNeedItemCount(
      skillForceNextValues.get('nextValue'),
      { entry: skillForce },
      { n },
    );

    const labelProp = label || withDefaultLabel ? label || message : undefined;

    return (
      <Input
        label={labelProp}
        fluid={fluid}
        size={size}
        value={value}
        onChange={this.changeValue}
        className={className}
        min="0"
        type="number"
      />
    );
  }

  render() {
    return (
      <ProjectSkillForceFieldFormattedMessage message="NeedItemCount">
        {this.renderInput}
      </ProjectSkillForceFieldFormattedMessage>
    );
  }
}

ProjectSkillForceInteractingNeedItemCount.propTypes = {
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
  n: PropTypes.number.isRequired,
};

ProjectSkillForceInteractingNeedItemCount.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
  fluid: true,
  withDefaultLabel: true,
};

export default ProjectSkillForceInteractingNeedItemCount;
