import gql from 'graphql-tag';

export default gql`
  mutation ProjectItemClientNDDescriptionImportBlocks(
    $projectId: String!
    $type: String!
    $blocks: JSON
    $importType: String
  ) {
    projectItemClientNDDescriptionImportBlocks(
      projectId: $projectId
      type: $type
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
