import gql from 'graphql-tag';

export default gql`
  mutation StoreUpdate($id: String!, $values: JSON) {
    storeUpdate(id: $id, values: $values) {
      id
    }
  }
`;
