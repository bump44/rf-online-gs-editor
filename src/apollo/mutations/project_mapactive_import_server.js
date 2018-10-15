import gql from 'graphql-tag';

export default gql`
  mutation ProjectMapActiveImportServer(
    $projectId: String!
    $blocks: JSON
    $importType: String
    $mapName: String!
    $activeName: String!
  ) {
    projectMapActiveImportServer(
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
