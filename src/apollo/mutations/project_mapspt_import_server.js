import gql from 'graphql-tag';

export default gql`
  mutation ProjectMapSptImportServer(
    $projectId: String!
    $blocks: JSON
    $importType: String
    $mapName: String!
  ) {
    projectMapSptImportServer(
      projectId: $projectId
      blocks: $blocks
      importType: $importType
      mapName: $mapName
    ) {
      total
    }
  }
`;
