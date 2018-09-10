import gql from 'graphql-tag';

const AuthorizedQuery = gql`
  query {
    projects(
      take: 15
      skip: 0
      sort: { createdAt: -1 }
      where: { isPublic: true }
    ) {
      items {
        title
        name
        id
        createdAt
        updatedAt
        isPublic
        owner {
          id
          login
        }
      }
      total
    }

    projectsMy(take: 15, skip: 0, sort: { createdAt: -1 }) {
      items {
        title
        name
        id
        createdAt
        updatedAt
        isPublic
        owner {
          id
          login
        }
      }
      total
    }
  }
`;

const NonAuthorizedQuery = gql`
  query {
    projects(take: 15, skip: 0, sort: { createdAt: -1 }) {
      items {
        title
        name
        id
        createdAt
        updatedAt
        isPublic
        owner {
          id
          login
        }
      }
      total
    }
  }
`;

export { AuthorizedQuery, NonAuthorizedQuery };
