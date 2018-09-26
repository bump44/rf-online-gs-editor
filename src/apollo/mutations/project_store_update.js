import gql from 'graphql-tag';

export default gql`
  mutation ProjectStoreUpdate($id: String!, $values: JSON) {
    projectStoreUpdate(id: $id, values: $values) {
      id
    }
  }
`;
