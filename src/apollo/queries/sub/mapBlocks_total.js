import gql from 'graphql-tag';

export default gql`
  query($where: JSON) {
    mapBlocks(where: $where) {
      total
    }
  }
`;
