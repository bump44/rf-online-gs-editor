import gql from 'graphql-tag';

export default gql`
  mutation ItemRemoveVirtual($id: String!) {
    itemRemoveVirtual(id: $id) {
      id
    }
  }
`;
