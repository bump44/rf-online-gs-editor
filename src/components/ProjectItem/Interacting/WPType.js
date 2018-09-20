/**
 *
 * ProjectItemInteractingWPType
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
class ProjectItemInteractingWPType extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(evt.target.value) || 0);
    };
  }

  render() {
    const { item, itemNextValues, types, className } = this.props;

    const nextValue = itemNextValues.getIn(['nextValue', 'server', 'nWPType']);

    const currValue = item.getIn(
      [['server', 'nWPType'], ['client', 'nWPType']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nWPType'],
      0,
    );

    const value = nextValue !== undefined ? nextValue : currValue;
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
                <FormattedMessage {...messages.UnknownWeaponType}>
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
                </option>
              ))}
            </select>
          </div>
          <span className="icon is-small is-left">
            <i className="fas fa-bolt" />
          </span>
        </div>
      </div>
    );
  }
}

ProjectItemInteractingWPType.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  types: PropTypes.instanceOf(List).isRequired,
  className: PropTypes.string,
};

ProjectItemInteractingWPType.defaultProps = {
  className: '',
};

export default ProjectItemInteractingWPType;
