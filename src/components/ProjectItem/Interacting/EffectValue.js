/**
 *
 * ProjectItemInteractingEffectValue
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Map /* , List */ } from 'immutable';
import { Input, Popup, Button } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import { UPPER, LOWER } from '../../../structs/item_types';

import {
  getEffectValue,
  getEffectTypeValueIsDisabled,
  getEffectTypeValue,
  getType,
} from '../../../containers/App/getters/projectItem';
import { getEffect25PresentValue } from '../../../utils/converters';

function usefulValue25Content(value) {
  const pres = getEffect25PresentValue(value);
  return `${pres.toFixed(2)}: ${pres}`;
}

const USEFUL_VALUES = {
  25: [
    {
      value: -311,
      types: [UPPER],
      content: usefulValue25Content,
    },
    {
      value: -297,
      types: [LOWER],
      content: usefulValue25Content,
    },
  ],
};

function getUsefulValues(effectTypeValue, itemType) {
  const effUsefulValues = USEFUL_VALUES[effectTypeValue] || [];
  return effUsefulValues
    .filter(usefulValue => usefulValue.types.includes(itemType))
    .map(usefulValue => ({
      key: usefulValue.key || usefulValue.value,
      value: usefulValue.value,
      content:
        typeof usefulValue.content === 'function'
          ? usefulValue.content(usefulValue.value)
          : usefulValue.content || usefulValue.value,
    }));
}

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingEffectValue extends React.PureComponent {
  constructor(props) {
    super(props);

    this.renderPopup = this.renderPopup.bind(this);
    this.renderInput = this.renderInput.bind(this);

    this.changeValue = evt => {
      const { onChangeValue, item, n } = this.props;
      onChangeValue(item, {
        value: parseFloat(evt.target.value.replace(/[^0-9,.-]/g, '')) || 0,
        n,
      });
    };

    this.changeValueAtUsefulValue = evt => {
      const { usefulValue } = evt.target.dataset;
      return this.changeValue({ target: { value: usefulValue.toString() } });
    };
  }

  renderPopup(usefulValues) {
    const { item, itemNextValues, n } = this.props;

    const value = getEffectValue(
      itemNextValues.get('nextValue'),
      { entry: item },
      { n },
    );

    return (
      <div>
        <PreMessage>
          <FormattedMessage {...messages.TheseValuesMayBeUseful} />:
        </PreMessage>
        {usefulValues.map(usefulValue => (
          <Button
            key={usefulValue.key}
            onClick={
              value === usefulValue.value
                ? undefined
                : this.changeValueAtUsefulValue
            }
            data-useful-value={usefulValue.value}
            title={usefulValue.value}
            size="mini"
            color={value === usefulValue.value ? 'green' : undefined}
          >
            {usefulValue.content}
          </Button>
        ))}
      </div>
    );
  }

  renderInput() {
    const {
      item,
      itemNextValues,
      size,
      className,
      label,
      fluid,
      n,
    } = this.props;

    const value = getEffectValue(
      itemNextValues.get('nextValue'),
      { entry: item },
      { n },
    );

    const isDisabled = getEffectTypeValueIsDisabled(
      itemNextValues.get('nextValue'),
      { entry: item },
      { n },
    );

    return (
      <Input
        fluid={fluid}
        size={size}
        className={className}
        value={value}
        onChange={this.changeValue}
        label={label}
        type="number"
        disabled={isDisabled}
      />
    );
  }

  render() {
    const { item, itemNextValues, n } = this.props;

    const itemType = getType(itemNextValues.get('nextValue'), { entry: item });
    const typeValue = getEffectTypeValue(
      itemNextValues.get('nextValue'),
      { entry: item },
      { n },
    );

    const usefulValues = getUsefulValues(typeValue, itemType);

    if (usefulValues.length <= 0) {
      return this.renderInput();
    }

    return (
      <Popup on="click" trigger={this.renderInput()} flowing hoverable>
        {this.renderPopup(usefulValues)}
      </Popup>
    );
  }
}

ProjectItemInteractingEffectValue.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  n: PropTypes.oneOf([1, 2, 3, 4]).isRequired,
  fluid: PropTypes.bool,
};

ProjectItemInteractingEffectValue.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
  fluid: true,
};

export default ProjectItemInteractingEffectValue;

const PreMessage = styled.pre`
  margin-bottom: 10px;
  margin-top: 0;
  font-weight: bold;
  padding: 0;
  background: transparent;
`;
