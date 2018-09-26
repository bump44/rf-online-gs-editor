import gql from 'graphql-tag';

export default gql`
  mutation ProjectStoreImportServer(
    $projectId: String!
    $blocks: JSON
    $importType: String
  ) {
    projectStoreImportServer(
      projectId: $projectId
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
