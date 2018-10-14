import gql from 'graphql-tag';

export default gql`
  query($where: JSON) {
    projectBoxItemOuts(where: $where) {
      total
    }
  }
`;
