import gql from 'graphql-tag';

export default gql`
  fragment MapSptNameParts on MapSpt {
    mapName
    strAnchor
    bExcludeNodeTm
    a1
    a2
    a3
    a4
    a5
    a6
    b1
    b2
    b3
    b4
    c1
    c2
    c3
    c4
    d1
    d2
    d3
    d4
    e1
    e2
    e3
    e4
  }
`;
