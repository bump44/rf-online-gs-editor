import gql from 'graphql-tag';

export default gql`
  mutation ProjectStoreImportClient(
    $projectId: String!
    $blocks: JSON
    $importType: String
  ) {
    projectStoreImportClient(
      projectId: $projectId
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
