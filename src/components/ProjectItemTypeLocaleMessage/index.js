/**
 *
 * ProjectItemTypeLocaleMessage
 *
 */

/* eslint-disable no-console */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ProjectItemTypeLocaleMessage({
  messageKey,
  tagName,
  children,
  upperFirst,
}) {
  const message = messages[messageKey];
  const TagName = `${tagName}`;

  if (!message) {
    console.warn(
      `ProjectItemTypeLocaleMessage message by key not defined:`,
      messageKey,
    );
  }

  const fnChild = children
    ? str => children(upperFirst ? _.upperFirst(str) : str)
    : undefined;

  return (
    <React.Fragment>
      {message && (
        <FormattedMessage {...message} tagName={tagName}>
          {fnChild}
        </FormattedMessage>
      )}
      {!message &&
        (fnChild ? fnChild(messageKey) : <TagName>{messageKey}</TagName>)}
    </React.Fragment>
  );
}

ProjectItemTypeLocaleMessage.propTypes = {
  messageKey: PropTypes.string.isRequired,
  tagName: PropTypes.string,
  children: PropTypes.func,
  upperFirst: PropTypes.bool,
};

ProjectItemTypeLocaleMessage.defaultProps = {
  tagName: 'span',
  upperFirst: false,
};

export default ProjectItemTypeLocaleMessage;
