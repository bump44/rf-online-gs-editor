import gql from 'graphql-tag';

export default gql`
  mutation ItemImportClient(
    $projectId: String!
    $type: String!
    $blocks: JSON
    $importType: String
  ) {
    itemImportClient(
      projectId: $projectId
      type: $type
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
