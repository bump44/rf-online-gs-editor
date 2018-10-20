import gql from 'graphql-tag';

export default gql`
  mutation ItemRemoveFully($id: String!) {
    itemRemoveFully(id: $id) {
      id
    }
  }
`;
