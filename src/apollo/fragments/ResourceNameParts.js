import gql from 'graphql-tag';

export default gql`
  fragment ResourceNameParts on Resource {
    strCode
    strCode2
    nPropNum
    nPropValue__1
    nPropValue__2
    nPropValue__3
    nPropValue__4
    nPropValue__5
    nPropValue__6
    nPropValue__7
    nPropValue__8
    nPropValue__9
    nPropValue__10
    strFileName
    strFileNameBBX
    strFileNameBN
    strPath
    strTexturePath
  }
`;
