import gql from 'graphql-tag';

export default gql`
  query($where: JSON) {
    mapPortals(where: $where) {
      total
    }
  }
`;
