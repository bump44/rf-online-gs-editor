import gql from 'graphql-tag';

export default gql`
  query($where: JSON) {
    boxItemOuts(where: $where) {
      total
    }
  }
`;
