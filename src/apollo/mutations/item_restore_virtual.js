import gql from 'graphql-tag';

export default gql`
  mutation ItemRestoreVirtual($id: String!) {
    itemRestoreVirtual(id: $id) {
      id
    }
  }
`;
