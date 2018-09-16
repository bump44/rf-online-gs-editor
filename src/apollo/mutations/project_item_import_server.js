import gql from 'graphql-tag';

export default gql`
  mutation ProjectItemImportServer(
    $projectId: String!
    $type: String!
    $blocks: JSON
    $importType: String
  ) {
    projectItemImportServer(
      projectId: $projectId
      type: $type
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
