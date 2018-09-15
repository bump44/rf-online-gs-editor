import gql from 'graphql-tag';

export default gql`
  mutation ProjectItemUpdate($id: String!, $values: JSON) {
    projectItemUpdate(id: $id, values: $values) {
      id
    }
  }
`;
