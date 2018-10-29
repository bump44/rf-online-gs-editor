import gql from 'graphql-tag';

import ItemClientNameParts from '~/apollo/fragments/ItemClientNameParts';
import ItemServerNameParts from '~/apollo/fragments/ItemServerNameParts';
import MapSptNameParts from '~/apollo/fragments/MapSptNameParts';
import ProjectIncludeAllTypes from '~/apollo/fragments/ProjectIncludeAllTypes';
import StoreClientNameParts from '~/apollo/fragments/StoreClientNameParts';
import StoreServerNameParts from '~/apollo/fragments/StoreServerNameParts';
import ResourceNameParts from '~/apollo/fragments/ResourceNameParts';

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

    store(id: $storeId) {
      id
      nIndex
      projectId

      client {
        ...StoreClientNameParts
      }

      server {
        ...StoreServerNameParts
      }

      mapSpts {
        id
        projectId
        ...MapSptNameParts
      }

      resources {
        id
        type
        projectId
        ...ResourceNameParts
      }

      items {
        id
        type
        nIndex
        projectId

        clientND {
          strName
        }

        client {
          ...ItemClientNameParts
        }

        server {
          ...ItemServerNameParts
        }
      }
    }
  }

  # include fragments
  ${ProjectIncludeAllTypes}
  ${StoreClientNameParts}
  ${StoreServerNameParts}
  ${ItemClientNameParts}
  ${ItemServerNameParts}
  ${MapSptNameParts}
  ${ResourceNameParts}
`;
