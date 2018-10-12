/**
 *
 * ProjectItemInteractingEffectValue
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { get, uniq } from 'lodash';
import { Map /* , List */ } from 'immutable';
import { Input, Popup, Button } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import * as ITEM_TYPES from '../../../structs/item_types';
import { getEffect25PresentValue } from '../../../utils/converters';

import {
  getEffectValue,
  getEffectTypeValueIsDisabled,
  getEffectTypeValue,
  getType,
} from '../../../containers/App/getters/projectItem';

const USEFUL_VALUES_CONTENT = {
  25: value => {
    const pres = getEffect25PresentValue(value);
    return `${value} ${pres}: ${pres.toFixed(2)}`;
  },
  9: value => ({ 0: 'Disable', 1: 'Enable' }[value] || `Unknown: ${value}`),
};

const USEFUL_VALUES = {
  [ITEM_TYPES.UPPER]: {
    25: [-311],
  },
  [ITEM_TYPES.LOWER]: {
    25: [-297],
  },
};

function injectUsefulValues(itemType, effectType, values) {
  USEFUL_VALUES[itemType] = USEFUL_VALUES[itemType] || {};
  USEFUL_VALUES[itemType][effectType] = (
    USEFUL_VALUES[itemType][effectType] || []
  ).concat(values);
}

function getUsefulValues(itemType, effectTypeValue, currentValue) {
  const fnContent = USEFUL_VALUES_CONTENT[effectTypeValue];
  const effUsefulValues = uniq(
    get(USEFUL_VALUES, `${itemType}.${effectTypeValue}`, []).concat(
      typeof fnContent === 'function' ? [currentValue] : [],
    ),
  );

  return effUsefulValues.map(usefulValue => ({
    key: usefulValue,
    value: usefulValue,
    content:
      typeof fnContent === 'function' ? fnContent(usefulValue) : usefulValue,
  }));
}

Object.values(ITEM_TYPES).forEach(itemType => {
  // accuracy & dodge fast-values
  injectUsefulValues(itemType, 3, [3, 5, 10, 15, 25, 50]);
  injectUsefulValues(itemType, 4, [3, 5, 10, 15, 25, 50]);
  injectUsefulValues(itemType, 9, [0, 1]);
});

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
      return this.changeValue({ target: { value: `${usefulValue}` } });
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

    const value = getEffectValue(
      itemNextValues.get('nextValue'),
      { entry: item },
      { n },
    );

    const usefulValues = getUsefulValues(itemType, typeValue, value);

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
