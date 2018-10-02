import gql from 'graphql-tag';
import ProjectStoreClientNameParts from '../fragments/ProjectStoreClientNameParts';
import ProjectStoreServerNameParts from '../fragments/ProjectStoreServerNameParts';
import ProjectItemClientNameParts from '../fragments/ProjectItemClientNameParts';
import ProjectItemServerNameParts from '../fragments/ProjectItemServerNameParts';

const itemList = Array.from(Array(200)).map(
  (_, index) => `
itemList__${index + 1} {
  id
  type
  nIndex
  client {
    ...ProjectItemClientNameParts
  }
  server {
    ...ProjectItemServerNameParts
  }
}
`,
);

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

      moneyTypes {
        items {
          title
          value
          fieldName
          valuation
        }
      }

      itemGrades {
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

      buttonTypes {
        items {
          title
          value
        }
      }
    }

    projectStore(id: $storeId) {
      id
      nIndex
      searchTextValue
      client {
        ...ProjectStoreClientNameParts
        ${itemList}
      }
      server {
        ...ProjectStoreServerNameParts
        ${itemList}
      }
    }
  }

  # include fragments
  ${ProjectStoreClientNameParts}
  ${ProjectStoreServerNameParts}
  ${ProjectItemClientNameParts}
  ${ProjectItemServerNameParts}
`;
