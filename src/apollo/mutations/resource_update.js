import gql from 'graphql-tag';

export default gql`
  mutation ResourceUpdate($id: String!, $values: JSON) {
    resourceUpdate(id: $id, values: $values) {
      id
    }
  }
`;
