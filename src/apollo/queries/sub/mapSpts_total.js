import gql from 'graphql-tag';

export default gql`
  query($where: JSON) {
    mapSpts(where: $where) {
      total
    }
  }
`;
