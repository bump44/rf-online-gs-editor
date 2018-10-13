import gql from 'graphql-tag';

export default gql`
  mutation ProjectItemRestoreVirtual($id: String!) {
    projectItemRestoreVirtual(id: $id) {
      id
    }
  }
`;
