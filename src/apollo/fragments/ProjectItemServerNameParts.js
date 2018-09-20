import gql from 'graphql-tag';

export default gql`
  fragment ProjectItemServerNameParts on ProjectItemServer {
    strName
    strCode
  }
`;
