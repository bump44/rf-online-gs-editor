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
    const { className, children, type } = this.props;

    return (
      <NotificationStyled className={cx(className)} type={type}>
        {children}
      </NotificationStyled>
    );
  }
}

Notification.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(['default', 'danger']),
};

Notification.defaultProps = {
  children: null,
  className: '',
  type: 'default',
};

export default Notification;

const NotificationStyled = styled.div`
  background-color: #ddd;
  border-radius: 4px;
  position: relative;

  padding: 10px;
  line-height: 16px;
  font-size: 14px;

  ${({ type }) =>
    type === 'danger' &&
    `
      background-color: #ff3860;
      color: #fff;
    `};
`;
