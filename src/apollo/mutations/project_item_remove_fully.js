import gql from 'graphql-tag';

export default gql`
  mutation ProjectItemRemoveFully($id: String!) {
    projectItemRemoveFully(id: $id) {
      id
    }
  }
`;
