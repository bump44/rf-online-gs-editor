/**
 *
 * ProjectPotionItemEffectInteractingCumulType
 *
 */

import { Checkbox } from 'semantic-ui-react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import { getCumulType } from '~/containers/App/getters/projectPotionItemEffect';
import ProjectPotionItemEffectFieldFormattedMessage from '../FieldFormattedMessage';

/* eslint-disable react/prefer-stateless-function */
class ProjectPotionItemEffectInteractingCumulType extends React.PureComponent {
  constructor(props) {
    super(props);

    this.renderCheckbox = this.renderCheckbox.bind(this);
    this.changeValue = (evt, owns) => {
      const { onChangeValue, potionItemEffect } = this.props;
      onChangeValue(potionItemEffect, owns.checked);
    };
  }

  renderCheckbox(message) {
    const {
      potionItemEffect,
      potionItemEffectNextValues,
      className,
    } = this.props;

    const value = getCumulType(potionItemEffectNextValues.get('nextValue'), {
      entry: potionItemEffect,
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
      <ProjectPotionItemEffectFieldFormattedMessage message="CumulType">
        {this.renderCheckbox}
      </ProjectPotionItemEffectFieldFormattedMessage>
    );
  }
}

ProjectPotionItemEffectInteractingCumulType.propTypes = {
  potionItemEffect: PropTypes.instanceOf(Map).isRequired,
  potionItemEffectNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ProjectPotionItemEffectInteractingCumulType.defaultProps = {
  className: '',
};

export default ProjectPotionItemEffectInteractingCumulType;
