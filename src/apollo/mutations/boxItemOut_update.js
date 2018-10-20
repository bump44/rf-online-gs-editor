import gql from 'graphql-tag';

export default gql`
  mutation BoxItemOutUpdate($id: String!, $values: JSON) {
    boxItemOutUpdate(id: $id, values: $values) {
      id
    }
  }
`;
