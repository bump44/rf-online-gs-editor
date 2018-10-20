import gql from 'graphql-tag';

export default gql`
  mutation MapBlockImportServer(
    $projectId: String!
    $blocks: JSON
    $importType: String
    $mapName: String!
  ) {
    mapBlockImportServer(
      projectId: $projectId
      blocks: $blocks
      importType: $importType
      mapName: $mapName
    ) {
      total
    }
  }
`;
