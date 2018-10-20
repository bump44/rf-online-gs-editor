import gql from 'graphql-tag';

export default gql`
  mutation ItemClientNDDescriptionImportBlocks(
    $projectId: String!
    $type: String!
    $blocks: JSON
    $importType: String
  ) {
    itemClientNDDescriptionImportBlocks(
      projectId: $projectId
      type: $type
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
