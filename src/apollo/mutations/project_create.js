import gql from 'graphql-tag';

export default gql`
  mutation ProjectCreate(
    $title: String!
    $description: String!
    $isPublic: Boolean!
  ) {
    projectCreate(
      title: $title
      description: $description
      isPublic: $isPublic
    ) {
      id
      title
    }
  }
`;
