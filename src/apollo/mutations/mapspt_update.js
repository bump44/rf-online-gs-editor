import gql from 'graphql-tag';

export default gql`
  mutation MapSptUpdate($id: String!, $values: JSON) {
    mapSptUpdate(id: $id, values: $values) {
      id
    }
  }
`;
