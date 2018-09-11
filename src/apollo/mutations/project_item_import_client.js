import gql from 'graphql-tag';

export default gql`
  mutation ProjectItemImportClient(
    $projectId: String!
    $type: String!
    $blocks: JSON
    $importType: String
  ) {
    projectItemImportClient(
      projectId: $projectId
      type: $type
      blocks: $blocks
      importType: $importType
    ) {
      items {
        client {
          strName
        }
      }
      total
    }
  }
`;
