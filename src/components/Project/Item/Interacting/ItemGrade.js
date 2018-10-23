/**
 *
 * ProjectItemInteractingItemGrade
 *
 */

import { Dropdown as DropdownUI } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { Map, List } from 'immutable';
import { parseInt, isNumber } from 'lodash';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {
  getItemGrade,
  getItemGradeType,
} from 'containers/App/getters/projectItem';

import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingItemGrade extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(owns.value) || 0);
    };
  }

  render() {
    const { item, itemNextValues, types, className } = this.props;
    const value = getItemGrade(itemNextValues.get('nextValue'), {
      entry: item,
    });

    const type = getItemGradeType(itemNextValues.get('nextValue'), {
      entry: item,
      itemGradeTypes: types,
    });

    const isUnknown = !type;

    return (
      <Dropdown
        text={
          isUnknown ? (
            <span>
              {isNumber(value) && `${value}: `}
              <FormattedMessage {...messages.UnknownItemGrade} />
            </span>
          ) : (
            `${type.get('value')}: ${type.get('title')}`
          )
        }
        inline
        labeled
        scrolling
        item
        icon="level up"
        className={cx(className, { unknown: isUnknown })}
        value={value}
      >
        <Dropdown.Menu>
          {isUnknown && (
            <DropdownItem
              selected
              text={
                <span>
                  {isNumber(value) && `${value}: `}
                  <FormattedMessage {...messages.UnknownItemGrade} />
                </span>
              }
            />
          )}

          {types.map(val => (
            <DropdownItem
              onClick={this.changeValue}
              selected={val.get('value') === value}
              key={val.get('value')}
              value={val.get('value')}
              text={
                <span>
                  {val.get('value')}: {val.get('title')}
                </span>
              }
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

ProjectItemInteractingItemGrade.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  types: PropTypes.instanceOf(List).isRequired,
  className: PropTypes.string,
};

ProjectItemInteractingItemGrade.defaultProps = {
  className: '',
};

export default ProjectItemInteractingItemGrade;

/* eslint-disable indent */
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

    &.unknown {
      border-color: #ce0830;
      background-color: #ce0830;
      color: #fff;
    }

    ${({ value }) =>
      value === 1 &&
      `
    border-color: #e4e436;
    background: #e4e436;
    color: #000;
    `};

    ${({ value }) =>
      value === 2 &&
      `
    border-color: #e436a6;
    background: #e436a6;
    color: #fff;
    `}

    ${({ value }) =>
      value === 3 &&
      `
    border-color: #e47636;
    background: #e47636;
    color: #fff;
    `}

    ${({ value }) =>
      value === 4 &&
      `
    border-color: #367ce4;
    background: #367ce4;
    color: #fff;
    `}

    ${({ value }) =>
      value === 5 &&
      `
    border-color: #ff89d5;
    background: #ff89d5;
    color: #000;
    `}

    ${({ value }) =>
      value === 6 &&
      `
    border-color: #ff2a2a;
    background: #ff2a2a;
    color: #fff;
    `}

    ${({ value }) =>
      value === 7 &&
      `
    border-color: #3acc74;
    background: #3acc74;
    color: #000;
    `}

    ${({ value }) =>
      value === 8 &&
      `
    border-color: #a4eac0;
    background: #a4eac0;
    color: #000;
    `}

    .menu>.item {
      &.selected {
        font-weight: bold;
        background: inherit;
      }
    }
  }
`;

const DropdownItem = styled(Dropdown.Item)`
  &.item {
    &.selected {
      font-weight: bold;
    }
  }

  ${({ value }) =>
    value === 1 &&
    `
  border-color: #e4e436;
  background: #e4e436;
  `};

  ${({ value }) =>
    value === 2 &&
    `
  border-color: #e436a6;
  background: #e436a6;
  `}

  ${({ value }) =>
    value === 3 &&
    `
  border-color: #e47636;
  background: #e47636;
  `}

  ${({ value }) =>
    value === 4 &&
    `
  border-color: #367ce4;
  background: #367ce4;
  `}

  ${({ value }) =>
    value === 5 &&
    `
  border-color: #ff89d5;
  background: #ff89d5;
  `}

  ${({ value }) =>
    value === 6 &&
    `
  border-color: #ff2a2a;
  background: #ff2a2a;
  `}

  ${({ value }) =>
    value === 7 &&
    `
  border-color: #3acc74;
  background: #3acc74;
  `}

  ${({ value }) =>
    value === 8 &&
    `
  border-color: #a4eac0;
  background: #a4eac0;
  `}
`;
/* eslint-enable indent */
