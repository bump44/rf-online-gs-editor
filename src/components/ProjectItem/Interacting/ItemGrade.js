/**
 *
 * ProjectItemInteractingItemGrade
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { parseInt } from 'lodash';
import { Map, List } from 'immutable';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingItemGrade extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(evt.target.value));
    };
  }

  render() {
    const { item, itemNextValues, types, className } = this.props;

    const nextValue = itemNextValues.getIn([
      'nextValue',
      'server',
      'nItemGrade',
    ]);

    const currValue = item.getIn(
      [['server', 'nItemGrade'], ['client', 'nItemGrade']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nItemGrade'],
      0,
    );

    const value = nextValue !== undefined ? nextValue : currValue;
    const isUnknown = !types.some(val => val.get('value') === value);

    return (
      <div className={cx('field', className)}>
        <SelectControl
          className="control has-icons-left"
          itemGrade={value}
          isUnknown={isUnknown}
        >
          <div className={cx('select is-small is-fullwidth')}>
            <select value={value} onChange={this.changeValue}>
              {isUnknown && (
                <FormattedMessage {...messages.UnknownItemGrade}>
                  {message => <option value={value}>{message}</option>}
                </FormattedMessage>
              )}
              {types.map(val => (
                <option value={val.get('value')} key={val.get('value')}>
                  {val.get('title')}
                </option>
              ))}
            </select>
          </div>
          <span className="icon is-small is-left">
            <i className="fas fa-level-up-alt" />
          </span>
        </SelectControl>
      </div>
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
const SelectControl = styled.div`
  .select {
    &:not(.is-multiple):not(.is-loading)::after {
      border-color: ${({ itemGrade }) =>
        [1, 8].indexOf(itemGrade) !== -1 ? '#333' : '#fff'};
      right: 1.125em;
      z-index: 4;
    }

    &:not(.is-multiple):not(.is-loading):hover::after {
      border-color: ${({ itemGrade }) =>
        [1, 8].indexOf(itemGrade) !== -1 ? '#000' : '#ddd'};
    }
  }

  select {
    border-color: #000;
    background: gray;
    color: #fff;

    transition: all 0.1s ease;
  }

  select,
  &.control.has-icons-left .icon {
    color: ${({ itemGrade }) =>
      [1, 8].indexOf(itemGrade) !== -1 ? '#333' : '#fff'};
  }

  select:focus,
  select.is-focused,
  select:active,
  select.is-active {
    border-color: #333;
    box-shadow: 0 0 0 0.125em rgba(0, 0, 0, 0.25);
  }

  select:hover,
  select.is-hovered {
    border-color: #5a5a5a;
  }

  select {
    ${({ isUnknown }) =>
      isUnknown &&
      `
      border-color: #ce0830;
      background-color: #ce0830;
    `};

    ${({ itemGrade }) =>
      itemGrade === 1 &&
      `
      border-color: #e4e436;
      background: #e4e436;
    `};

    ${({ itemGrade }) =>
      itemGrade === 2 &&
      `
      border-color: #e436a6;
      background: #e436a6;
    `}

    ${({ itemGrade }) =>
      itemGrade === 3 &&
      `
      border-color: #e47636;
      background: #e47636;
    `}

    ${({ itemGrade }) =>
      itemGrade === 4 &&
      `
      border-color: #367ce4;
      background: #367ce4;
    `}

    ${({ itemGrade }) =>
      itemGrade === 5 &&
      `
      border-color: #ff89d5;
      background: #ff89d5;
    `}

    ${({ itemGrade }) =>
      itemGrade === 6 &&
      `
      border-color: #ff2a2a;
      background: #ff2a2a;
    `}

    ${({ itemGrade }) =>
      itemGrade === 7 &&
      `
      border-color: #3acc74;
      background: #3acc74;
    `}

    ${({ itemGrade }) =>
      itemGrade === 8 &&
      `
      border-color: #a4eac0;
      background: #a4eac0;
    `}
  }
`;
/* eslint-enable indent */
