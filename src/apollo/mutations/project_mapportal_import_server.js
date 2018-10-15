import gql from 'graphql-tag';

export default gql`
  mutation ProjectMapPortalImportServer(
    $projectId: String!
    $blocks: JSON
    $importType: String
    $mapName: String!
  ) {
    projectMapPortalImportServer(
      projectId: $projectId
      blocks: $blocks
      importType: $importType
      mapName: $mapName
    ) {
      total
    }
  }
`;
