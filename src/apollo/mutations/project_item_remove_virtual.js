import gql from 'graphql-tag';

export default gql`
  mutation ProjectItemRemoveVirtual($id: String!) {
    projectItemRemoveVirtual(id: $id) {
      id
    }
  }
`;
