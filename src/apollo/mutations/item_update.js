import gql from 'graphql-tag';

export default gql`
  mutation ItemUpdate($id: String!, $values: JSON) {
    itemUpdate(id: $id, values: $values) {
      id
    }
  }
`;
