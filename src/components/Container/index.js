/**
 *
 * Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container as ContainerUI } from 'semantic-ui-react';

function Container({ children, ...props }) {
  return <ContainerStyled {...props}>{children}</ContainerStyled>;
}

Container.propTypes = {
  fluid: PropTypes.bool,
  children: PropTypes.node,
};

Container.defaultProps = {
  fluid: true,
  children: undefined,
};

export default Container;

const ContainerStyled = styled(ContainerUI)`
  padding: 0 15px;
`;
