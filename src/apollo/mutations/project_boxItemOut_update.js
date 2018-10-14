import gql from 'graphql-tag';

export default gql`
  mutation ProjectBoxItemOutUpdate($id: String!, $values: JSON) {
    projectBoxItemOutUpdate(id: $id, values: $values) {
      id
    }
  }
`;
