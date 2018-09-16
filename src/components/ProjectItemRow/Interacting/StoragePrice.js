/**
 *
 * ProjectItemRowInteractingStoragePrice
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { parseInt } from 'lodash';
import { Map, List } from 'immutable';
import cx from 'classnames';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

const PERCENTS = [1, 3, 5, 9, 15, 25, 50, 75];

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRowInteractingStoragePrice extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { isUpDropdown: false };

    this.getMoneyType = this.getMoneyType.bind(this);
    this.getMoneyValue = this.getMoneyValue.bind(this);
    this.getStoragePrice = this.getStoragePrice.bind(this);
    this.renderDropdownMenu = this.renderDropdownMenu.bind(this);
    this.onMouseEnterDropdown = this.onMouseEnterDropdown.bind(this);
    this.calcValueByPercent = this.calcValueByPercent.bind(this);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(evt.target.value.replace(/[^0-9]/g, '')));
    };

    this.changeValueAtPercent = evt => {
      const { percent } = evt.target.dataset;
      const nextValue = this.calcValueByPercent(percent);
      return this.changeValue({ target: { value: `${nextValue}` } });
    };
  }

  calcValueByPercent(percent) {
    const type = this.getMoneyType();
    if (!type) {
      return 0;
    }
    const value = this.getMoneyValue(type);
    return parseInt((value * percent) / 100);
  }

  onMouseEnterDropdown(evt) {
    const y = evt.clientY;
    const inner = window.innerHeight;
    const ymax = y + 100;
    this.setState({ isUpDropdown: ymax > inner });
  }

  getStoragePrice() {
    const { item, itemNextValues } = this.props;

    const nextValue = itemNextValues.getIn([
      'nextValue',
      'server',
      'nStoragePrice',
    ]);

    const currValue = item.getIn(
      [['server', 'nStoragePrice'], ['client', 'nStoragePrice']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nStoragePrice'],
      0,
    );

    return parseInt(nextValue !== undefined ? nextValue : currValue) || 0;
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

  getMoneyType() {
    const { item, itemNextValues, types } = this.props;

    // money type
    const nextValue = itemNextValues.getIn(['nextValue', 'server', 'nMoney']);

    const currValue = item.getIn(
      [['server', 'nMoney'], ['client', 'nMoney']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nMoney'],
      0,
    );

    const value = nextValue !== undefined ? nextValue : currValue;
    return types.find(val => val.get('value') === value);
  }

  renderDropdownMenu() {
    const type = this.getMoneyType();

    if (!type) {
      return null;
    }

    const value = this.getMoneyValue(type);

    if (value <= 0) {
      return null;
    }

    return (
      <div className="dropdown-menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
            <DropdownPreMessage>
              <FormattedMessage {...messages.CalcStoragePriceMessage} />:
            </DropdownPreMessage>
            {PERCENTS.filter(
              percent => this.calcValueByPercent(percent) > 0 || percent === 1,
            ).map(percent => (
              <DropdownItem
                key={percent}
                onClick={this.changeValueAtPercent}
                data-percent={percent}
                isActive={
                  this.calcValueByPercent(percent) === this.getStoragePrice()
                }
              >
                {percent}%
              </DropdownItem>
            ))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { isUpDropdown } = this.state;
    const value = this.getStoragePrice().toLocaleString();

    return (
      <div className="field has-addons">
        <div className="control">
          <div
            className={cx('dropdown is-hoverable', { 'is-up': isUpDropdown })}
            onMouseEnter={this.onMouseEnterDropdown}
          >
            <div className="dropdown-trigger">
              <button className="button is-small" type="button">
                <span>
                  <FormattedMessage {...messages.StoragePrice} />:
                </span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true" />
                </span>
              </button>
            </div>
            {this.renderDropdownMenu()}
          </div>
        </div>
        <input
          className="input is-small"
          type="text"
          value={value}
          onChange={this.changeValue}
        />
      </div>
    );
  }
}

ProjectItemRowInteractingStoragePrice.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  types: PropTypes.instanceOf(List).isRequired,
};

export default ProjectItemRowInteractingStoragePrice;

const DropdownItem = styled.button.attrs({
  className: 'button is-small',
})`
  margin-right: 3px;
  margin-bottom: 3px;

  ${({ isActive }) =>
    isActive &&
    `
    background-color: #23d160;
    border-color: transparent;
    color: #fff;
    &:active,
    &:focus,
    &:hover {
      background-color: #20bc56;
      border-color: transparent;
      color: #fff;
    }
  `};
`;

const DropdownPreMessage = styled.pre`
  margin-bottom: 10px;
  font-weight: bold;
  padding: 0;
  background: transparent;
`;
