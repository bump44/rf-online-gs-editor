/**
 *
 * ProjectItemInteractingMoneyType
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { parseInt, isNumber } from 'lodash';
import { Map, List } from 'immutable';
import { Dropdown as DropdownUI } from 'semantic-ui-react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingMoneyType extends React.PureComponent {
  constructor(props) {
    super(props);

    this.getMoneyValue = this.getMoneyValue.bind(this);
    this.getMoneyType = this.getMoneyType.bind(this);
    this.changeValue = (evt, owns) => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(owns.value) || 0);
    };
  }

  getMoneyType() {
    const { item, itemNextValues } = this.props;

    const nextValue = itemNextValues.getIn(['nextValue', 'server', 'nMoney']);

    const currValue = item.getIn(
      [['server', 'nMoney'], ['client', 'nMoney']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nMoney'],
      0,
    );

    const value = nextValue !== undefined ? nextValue : currValue;

    return value;
  }

  getMoneyValue(type) {
    if (!type) {
      return 0;
    }

    const { item, itemNextValues } = this.props;

    const nextValue = itemNextValues.getIn([
      'nextValue',
      'server',
      type.get('fieldName'),
    ]);

    const currValue = item.getIn(
      [
        ['server', type.get('fieldName')],
        ['client', type.get('fieldName')],
      ].find(fieldSets => item.getIn(fieldSets) !== undefined) || [
        'server',
        type.get('fieldName'),
      ],
      0,
    );

    const value =
      parseInt(nextValue !== undefined ? nextValue : currValue) || 0;

    return value;
  }

  render() {
    const { types, className } = this.props;

    const value = this.getMoneyType();
    const type = types.find(val => val.get('value') === value);
    const isUnknown = !type;

    return (
      <Dropdown
        text={
          isUnknown ? (
            <span>
              {isNumber(value) && `${value}: `}
              <FormattedMessage {...messages.UnknownMoneyType} />
            </span>
          ) : (
            `${type.get('value')}: ${type.get('title')}`
          )
        }
        inline
        labeled
        scrolling
        item
        icon="dollar"
        className={className}
      >
        <Dropdown.Menu>
          {isUnknown && (
            <Dropdown.Item
              selected
              text={
                <span>
                  {isNumber(value) && `${value}: `}
                  <FormattedMessage {...messages.UnknownMoneyType} />
                </span>
              }
            />
          )}

          {types.map(val => (
            <Dropdown.Item
              onClick={this.changeValue}
              selected={val.get('value') === value}
              key={val.get('value')}
              value={val.get('value')}
              text={
                <span>
                  {val.get('value')}: {val.get('title')}
                  &nbsp;
                  <small className="gray">
                    {this.getMoneyValue(val).toLocaleString()}
                  </small>
                </span>
              }
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

ProjectItemInteractingMoneyType.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  types: PropTypes.instanceOf(List).isRequired,
  className: PropTypes.string,
};

ProjectItemInteractingMoneyType.defaultProps = {
  className: '',
};

export default ProjectItemInteractingMoneyType;

const Dropdown = styled(DropdownUI)`
  &.ui.dropdown {
    padding: 0 7px;
    line-height: 14px;
    font-size: 12px;
    margin-bottom: 10px;
    margin-top: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 3px;

    &:hover {
      color: #000;
    }
  }
`;
