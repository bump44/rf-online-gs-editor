import gql from 'graphql-tag';

export default gql`
  fragment ProjectStoreClientNameParts on ProjectStoreClient {
    strCode
    strStoreNPCname
    strStoreNPClastName
  }
`;
