import gql from 'graphql-tag';

export default gql`
  mutation BoxItemOutImportServer(
    $projectId: String!
    $blocks: JSON
    $importType: String
  ) {
    boxItemOutImportServer(
      projectId: $projectId
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
