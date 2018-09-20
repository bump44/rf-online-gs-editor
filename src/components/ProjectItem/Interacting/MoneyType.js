/**
 *
 * ProjectItemInteractingMoneyType
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { parseInt, isNumber } from 'lodash';
import { Map, List } from 'immutable';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingMoneyType extends React.PureComponent {
  constructor(props) {
    super(props);

    this.getMoneyValue = this.getMoneyValue.bind(this);
    this.getMoneyType = this.getMoneyType.bind(this);
    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(evt.target.value));
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
    const isUnknown = !types.some(val => val.get('value') === value);

    return (
      <div className={cx('field', className)}>
        <div className="control has-icons-left">
          <div
            className={cx('select is-small is-fullwidth', {
              'is-danger': isUnknown,
              'is-info': !isUnknown,
            })}
          >
            <select
              value={isNumber(value) ? value : undefined}
              onChange={this.changeValue}
            >
              {isUnknown && (
                <FormattedMessage {...messages.UnknownMoneyType}>
                  {message => (
                    <option value={value}>
                      {isNumber(value) && `${value}: `}
                      {message}
                    </option>
                  )}
                </FormattedMessage>
              )}
              {types.map(val => (
                <option value={val.get('value')} key={val.get('value')}>
                  {val.get('value')}
                  :&nbsp;
                  {val.get('title')}
                  &nbsp; ({this.getMoneyValue(val).toLocaleString()})
                </option>
              ))}
            </select>
          </div>
          <span className="icon is-small is-left">
            <i className="fas fa-dollar-sign" />
          </span>
        </div>
      </div>
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
