/**
 *
 * ProjectItem
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ProjectItem() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ProjectItem.propTypes = {};

export default ProjectItem;
