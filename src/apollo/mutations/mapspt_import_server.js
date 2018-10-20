import gql from 'graphql-tag';

export default gql`
  mutation MapSptImportServer(
    $projectId: String!
    $blocks: JSON
    $importType: String
    $mapName: String!
  ) {
    mapSptImportServer(
      projectId: $projectId
      blocks: $blocks
      importType: $importType
      mapName: $mapName
    ) {
      total
    }
  }
`;
