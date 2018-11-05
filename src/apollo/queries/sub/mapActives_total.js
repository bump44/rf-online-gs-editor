import gql from 'graphql-tag';

export default gql`
  query($where: JSON) {
    mapActives(where: $where) {
      total
    }
  }
`;
