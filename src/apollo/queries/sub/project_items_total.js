import gql from 'graphql-tag';

export default gql`
  query($where: JSON) {
    projectItems(where: $where) {
      total
    }
  }
`;
