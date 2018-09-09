import gql from 'graphql-tag';

const AuthorizedQuery = gql`
  query {
    projects(take: 15, skip: 0, sort: { createdAt: -1 }) {
      items {
        title
        name
        id
        createdAt
        updatedAt
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
      }
      total
    }
  }
`;

export { AuthorizedQuery, NonAuthorizedQuery };
