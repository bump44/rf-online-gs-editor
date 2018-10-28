import gql from 'graphql-tag';

export default gql`
  mutation ResourceImportClient(
    $projectId: String!
    $type: String!
    $blocks: JSON
    $importType: String
  ) {
    resourceImportClient(
      projectId: $projectId
      type: $type
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
