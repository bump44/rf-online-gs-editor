/**
 *
 * ProjectItemTypeLocaleMessage
 *
 */

/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ProjectItemTypeLocaleMessage({ messageKey, tagName }) {
  const message = messages[messageKey];
  const TagName = `${tagName}`;

  if (!message) {
    console.warn(
      `ProjectItemTypeLocaleMessage message by key not defined:`,
      messageKey,
    );
  }

  return (
    <React.Fragment>
      {message && <FormattedMessage {...message} tagName={tagName} />}
      {!message && <TagName>{messageKey}</TagName>}
    </React.Fragment>
  );
}

ProjectItemTypeLocaleMessage.propTypes = {
  messageKey: PropTypes.string.isRequired,
  tagName: PropTypes.string,
};

ProjectItemTypeLocaleMessage.defaultProps = {
  tagName: 'span',
};

export default ProjectItemTypeLocaleMessage;
