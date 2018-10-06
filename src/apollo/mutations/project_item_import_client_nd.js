import gql from 'graphql-tag';

export default gql`
  mutation ProjectItemImportClientND(
    $projectId: String!
    $type: String!
    $blocks: JSON
    $importType: String
  ) {
    projectItemImportClientND(
      projectId: $projectId
      type: $type
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
