import gql from 'graphql-tag';

export default gql`
  mutation ProjectBoxItemOutImportServer(
    $projectId: String!
    $blocks: JSON
    $importType: String
  ) {
    projectBoxItemOutImportServer(
      projectId: $projectId
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
