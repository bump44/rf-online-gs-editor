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
  }
`;
