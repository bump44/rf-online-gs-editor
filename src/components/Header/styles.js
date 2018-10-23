import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Menu)`
  -webkit-app-region: drag;

  .item {
    -webkit-app-region: no-drag;
  }

  &.ui.menu {
    border-radius: 0;
  }
`;

export const BrandLink = styled(NavLink)``;

export const BrandContent = styled.span`
  position: relative;
`;

export const BrandVersion = styled.span`
  font-weight: bold;
  font-size: 12px;
  text-transform: lowercase;
  color: gray;
  display: block;
`;

export const UserLink = styled(NavLink)``;
export const UserUserName = styled.span``;
