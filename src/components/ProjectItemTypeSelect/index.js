/**
 *
 * ProjectItemTypeSelect
 *
 */

import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import ProjectItemTypeLocaleMessage from '../ProjectItemTypeLocaleMessage';
import * as itemTypes from '../../structs/item_types';

const options = map(itemTypes, (type, key) => ({
  key,
  value: type,
  text: <ProjectItemTypeLocaleMessage messageKey={type} upperFirst />,
}));

options.unshift({
  key: '___',
  value: '0',
  text: <FormattedMessage {...messages.ItemType} />,
});

/* eslint-disable react/prefer-stateless-function */
class ProjectItemTypeSelect extends React.PureComponent {
  render() {
    const { onChange, value } = this.props;

    return (
      <Dropdown
        selection
        scrolling
        onChange={onChange}
        value={value}
        options={options}
      />
    );
  }
}

ProjectItemTypeSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

ProjectItemTypeSelect.defaultProps = {
  onChange: undefined,
  value: '',
};

export default ProjectItemTypeSelect;
