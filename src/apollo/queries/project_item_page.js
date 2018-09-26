import gql from 'graphql-tag';
import ProjectItemClientNameParts from '../fragments/ProjectItemClientNameParts';
import ProjectItemServerNameParts from '../fragments/ProjectItemServerNameParts';

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

      moneyTypes(take: 50) {
        items {
          title
          value
          fieldName
          valuation
        }
      }

      itemGrades(take: 50) {
        items {
          title
          value
        }
      }

      weaponTypes(take: 50) {
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
    }
  }

  # include fragments
  ${ProjectItemClientNameParts}
  ${ProjectItemServerNameParts}
`;
