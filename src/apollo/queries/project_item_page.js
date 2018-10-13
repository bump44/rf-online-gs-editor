import gql from 'graphql-tag';
import ProjectIncludeAllTypes from '../fragments/ProjectIncludeAllTypes';
import ProjectItemClientNameParts from '../fragments/ProjectItemClientNameParts';
import ProjectItemServerNameParts from '../fragments/ProjectItemServerNameParts';
import ProjectBoxItemOutNameParts from '../fragments/ProjectBoxItemOutNameParts';
import ProjectBoxItemOutItemListNameParts from '../fragments/ProjectBoxItemOutItemListNameParts';

export default gql`
  query($id: String!, $itemId: String!) {
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

    projectItem(id: $itemId) {
      id
      type
      nIndex
      isRemoved
      clientND {
        strName
      }
      client {
        ...ProjectItemClientNameParts
      }
      server {
        ...ProjectItemServerNameParts
      }
      boxItemOut {
        id
        nIndex
        ...ProjectBoxItemOutNameParts
        ...ProjectBoxItemOutItemListNameParts
      }
    }
  }

  # include fragments
  ${ProjectIncludeAllTypes}
  ${ProjectItemClientNameParts}
  ${ProjectItemServerNameParts}
  ${ProjectBoxItemOutNameParts}
  ${ProjectBoxItemOutItemListNameParts}
`;
