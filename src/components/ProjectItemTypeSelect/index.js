/**
 *
 * ProjectItemTypeSelect
 *
 */

import map from 'lodash/map';
import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import ProjectItemTypeLocaleMessage from '../ProjectItemTypeLocaleMessage';
import * as itemTypes from '../../structs/item_types';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemTypeSelect extends React.PureComponent {
  render() {
    const {
      className,
      onChange,
      value,
      prependBeforeEmpty,
      prependBeforeEmptyValue,
      prependBeforeEmptyMessageKey,
    } = this.props;

    return (
      <select
        value={value}
        className={cx('select', className)}
        onChange={onChange}
      >
        {prependBeforeEmpty && (
          <FormattedMessage {...messages[prependBeforeEmptyMessageKey]}>
            {message => (
              <option value={prependBeforeEmptyValue}>{message}</option>
            )}
          </FormattedMessage>
        )}

        {map(itemTypes, (type, key) => (
          <ProjectItemTypeLocaleMessage key={key} messageKey={type} upperFirst>
            {message => <option value={type}>{message}</option>}
          </ProjectItemTypeLocaleMessage>
        ))}
      </select>
    );
  }
}

ProjectItemTypeSelect.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  prependBeforeEmpty: PropTypes.bool,
  prependBeforeEmptyValue: PropTypes.string,
  prependBeforeEmptyMessageKey: PropTypes.oneOf(['All', 'Empty']),
};

ProjectItemTypeSelect.defaultProps = {
  onChange: undefined,
  value: '',
  prependBeforeEmpty: false,
  prependBeforeEmptyValue: '',
  prependBeforeEmptyMessageKey: 'All',
};

export default ProjectItemTypeSelect;
