/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cx from 'classnames';

/* eslint-disable react/prefer-stateless-function */
class Button extends React.PureComponent {
  render() {
    const {
      className,
      children,
      icon,
      loading,
      disabled,
      onClick,
    } = this.props;

    return (
      <SButton
        type="button"
        className={cx(className, { 'is-loading': loading })}
        disabled={loading || disabled}
        onClick={onClick}
      >
        {icon && (
          <span>
            <i className={`fas fa-${icon}`} />
            {children && <span>&nbsp;</span>}
          </span>
        )}
        {children}
      </SButton>
    );
  }
}

Button.propTypes = {
  icon: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  icon: null,
  loading: false,
  disabled: false,
  children: null,
  className: '',
  onClick: null,
};

export default Button;

const SButton = styled.button.attrs({ className: 'button' })`
  &:hover {
    cursor: pointer;
  }
`;
