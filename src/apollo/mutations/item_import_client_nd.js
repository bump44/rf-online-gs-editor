import gql from 'graphql-tag';

export default gql`
  mutation ItemImportClientND(
    $projectId: String!
    $type: String!
    $blocks: JSON
    $importType: String
  ) {
    itemImportClientND(
      projectId: $projectId
      type: $type
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
