/**
 *
 * ProjectPotionItemEffectInteractingNeedItemCode
 *
 */

import { Input } from 'semantic-ui-react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import { getNeedItemCode } from '~/containers/App/getters/projectPotionItemEffect';
import ProjectPotionItemEffectFieldFormattedMessage from '../FieldFormattedMessage';

/* eslint-disable react/prefer-stateless-function */
class ProjectPotionItemEffectInteractingNeedItemCode extends React.PureComponent {
  constructor(props) {
    super(props);

    this.renderInput = this.renderInput.bind(this);
    this.changeValue = evt => {
      const { onChangeValue, potionItemEffect, n } = this.props;
      onChangeValue(potionItemEffect, { value: evt.target.value, n });
    };
  }

  renderInput(message) {
    const {
      potionItemEffect,
      potionItemEffectNextValues,
      className,
      label,
      fluid,
      size,
      withDefaultLabel,
      n,
    } = this.props;

    const value = getNeedItemCode(
      potionItemEffectNextValues.get('nextValue'),
      { entry: potionItemEffect },
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
      />
    );
  }

  render() {
    return (
      <ProjectPotionItemEffectFieldFormattedMessage message="NeedItemCode">
        {this.renderInput}
      </ProjectPotionItemEffectFieldFormattedMessage>
    );
  }
}

ProjectPotionItemEffectInteractingNeedItemCode.propTypes = {
  potionItemEffect: PropTypes.instanceOf(Map).isRequired,
  potionItemEffectNextValues: PropTypes.instanceOf(Map).isRequired,
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

ProjectPotionItemEffectInteractingNeedItemCode.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
  fluid: true,
  withDefaultLabel: true,
};

export default ProjectPotionItemEffectInteractingNeedItemCode;
