import gql from 'graphql-tag';

export default gql`
  query($id: String!) {
    project(id: $id) {
      title
      name
      id
      createdAt
      updatedAt
      owner {
        id
        login
        role {
          id
          name
          title
        }
      }
    }
  }
`;
