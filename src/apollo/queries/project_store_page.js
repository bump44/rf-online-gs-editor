import gql from 'graphql-tag';
import ProjectIncludeAllTypes from '../fragments/ProjectIncludeAllTypes';
import ProjectStoreClientNameParts from '../fragments/ProjectStoreClientNameParts';
import ProjectStoreServerNameParts from '../fragments/ProjectStoreServerNameParts';
import ProjectItemClientNameParts from '../fragments/ProjectItemClientNameParts';
import ProjectItemServerNameParts from '../fragments/ProjectItemServerNameParts';

export default gql`
  query($id: String!, $storeId: String!) {
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

      # include types
      ...ProjectIncludeAllTypes
    }

    projectStore(id: $storeId) {
      id
      nIndex
      searchTextValue
      client {
        ...ProjectStoreClientNameParts
      }
      server {
        ...ProjectStoreServerNameParts
      }
      arrayItems {
        id
        type
        nIndex
        clientND {
          strName
        }
        client {
          ...ProjectItemClientNameParts
        }
        server {
          ...ProjectItemServerNameParts
        }
      }
    }
  }

  # include fragments
  ${ProjectIncludeAllTypes}
  ${ProjectStoreClientNameParts}
  ${ProjectStoreServerNameParts}
  ${ProjectItemClientNameParts}
  ${ProjectItemServerNameParts}
`;
