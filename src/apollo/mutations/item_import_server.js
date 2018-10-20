import gql from 'graphql-tag';

export default gql`
  mutation ItemImportServer(
    $projectId: String!
    $type: String!
    $blocks: JSON
    $importType: String
  ) {
    itemImportServer(
      projectId: $projectId
      type: $type
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
