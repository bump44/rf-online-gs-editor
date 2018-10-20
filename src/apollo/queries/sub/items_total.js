import gql from 'graphql-tag';

export default gql`
  query($where: JSON) {
    items(where: $where) {
      total
    }
  }
`;
