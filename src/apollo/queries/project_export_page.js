import gql from 'graphql-tag';

export default gql`
  query($id: String!) {
    project(id: $id) {
      title
      description
      name
      id
      createdAt
      updatedAt
      isPublic
      owner {
        id
        login
        role {
          id
          name
          title
        }
      }
      items {
        total
      }
      stores {
        total
      }
      itemsBox: items(where: { type: "box" }) {
        total
      }
      boxItemOuts {
        total
      }
      resources {
        total
      }
      mapSpts {
        total
      }

      mapNameTypes {
        items {
          title
          value
          caseSens
        }
      }
    }
  }
`;
