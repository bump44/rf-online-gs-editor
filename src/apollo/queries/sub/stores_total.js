import gql from 'graphql-tag';

export default gql`
  query($where: JSON) {
    stores(where: $where) {
      total
    }
  }
`;
