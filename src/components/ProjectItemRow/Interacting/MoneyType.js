/**
 *
 * ProjectItemRowInteractingMoneyType
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { parseInt } from 'lodash';
import { Map, List } from 'immutable';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRowInteractingMoneyType extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(evt.target.value));
    };
  }

  render() {
    const { item, itemNextValues, types } = this.props;

    const nextValue = itemNextValues.getIn(['nextValue', 'server', 'nMoney']);

    const currValue = item.getIn(
      [['server', 'nMoney'], ['client', 'nMoney']].find(
        fieldSets => !!item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nMoney'],
      0,
    );

    const value = nextValue !== undefined ? nextValue : currValue;
    const isUnknown = !types.some(val => val.get('value') === value);

    return (
      <div className="field">
        <div className="control has-icons-left">
          <div
            className={cx('select is-small is-fullwidth', {
              'is-danger': isUnknown,
              'is-info': !isUnknown,
            })}
          >
            <select value={value} onChange={this.changeValue}>
              {isUnknown && (
                <FormattedMessage {...messages.UnknownMoneyType}>
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
            <i className="fas fa-dollar-sign" />
          </span>
        </div>
      </div>
    );
  }
}

ProjectItemRowInteractingMoneyType.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  types: PropTypes.instanceOf(List).isRequired,
};

export default ProjectItemRowInteractingMoneyType;
