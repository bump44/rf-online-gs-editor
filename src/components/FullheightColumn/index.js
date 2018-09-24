/**
 *
 * FullheightColumn
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
import { AutoSizer } from 'react-virtualized';

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

export function FullheightAutoSizer({ children }) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FullheightAutoSizerChild height={height} width={width}>
          {children}
        </FullheightAutoSizerChild>
      )}
    </AutoSizer>
  );
}

FullheightAutoSizer.propTypes = {
  children: PropTypes.node.isRequired,
};

const FullheightAutoSizerChild = styled.div`
  ${({ width, height }) => `
    width: ${width}px;
    height: ${height}px;
  `};

  overflow: hidden;
  overflow-y: scroll;
  padding-right: 15px;
`;
