import gql from 'graphql-tag';

export default gql`
  mutation MapPortalImportServer(
    $projectId: String!
    $blocks: JSON
    $importType: String
    $mapName: String!
  ) {
    mapPortalImportServer(
      projectId: $projectId
      blocks: $blocks
      importType: $importType
      mapName: $mapName
    ) {
      total
    }
  }
`;
