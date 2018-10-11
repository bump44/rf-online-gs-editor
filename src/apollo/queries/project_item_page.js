import gql from 'graphql-tag';
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

      moneyTypes {
        items {
          title
          value
          fieldName
          valuation
        }
      }

      itemGradeTypes {
        items {
          title
          value
        }
      }

      weaponTypes {
        items {
          title
          value
        }
      }
    }

    projectItem(id: $itemId) {
      id
      type
      nIndex
      searchTextValue
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
  ${ProjectItemClientNameParts}
  ${ProjectItemServerNameParts}
  ${ProjectBoxItemOutNameParts}
  ${ProjectBoxItemOutItemListNameParts}
`;
