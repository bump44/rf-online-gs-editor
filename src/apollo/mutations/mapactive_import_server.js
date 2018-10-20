import gql from 'graphql-tag';

export default gql`
  mutation MapActiveImportServer(
    $projectId: String!
    $blocks: JSON
    $importType: String
    $mapName: String!
    $activeName: String!
  ) {
    mapActiveImportServer(
      projectId: $projectId
      blocks: $blocks
      importType: $importType
      mapName: $mapName
      activeName: $activeName
    ) {
      total
    }
  }
`;
