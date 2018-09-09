/**
 *
 * Notification
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cx from 'classnames';

/* eslint-disable react/prefer-stateless-function */
class Notification extends React.PureComponent {
  render() {
    const { className, children } = this.props;

    return <SNotification className={cx(className)}>{children}</SNotification>;
  }
}

Notification.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Notification.defaultProps = {
  children: null,
  className: '',
};

export default Notification;

const SNotification = styled.div.attrs({ className: 'notification' })`
  padding: 10px;
  line-height: 16px;
  font-size: 14px;
`;
