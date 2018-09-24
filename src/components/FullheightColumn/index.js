/**
 *
 * FullheightColumn
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

class FullheightColumn extends React.PureComponent {
  render() {
    const { children, ...props } = this.props;

    return (
      <Grid.Column style={columnStyle} {...props}>
        {children}
      </Grid.Column>
    );
  }
}

FullheightColumn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FullheightColumn;

const columnStyle = { display: 'flex', flexDirection: 'column' };

// const displayName = 'FullheightColumn__FullheightThis';

export const FullheightThis = styled.div`
  display: flex;
  flex: 1 100%;
  padding-top: ${({ paddingTop }) => paddingTop || 15}px;
  padding-bottom: ${({ paddingBottom }) => paddingBottom || 0}px;
`;
