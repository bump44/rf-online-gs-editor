import gql from 'graphql-tag';

export default gql`
  query($where: JSON) {
    resources(where: $where) {
      total
    }
  }
`;
