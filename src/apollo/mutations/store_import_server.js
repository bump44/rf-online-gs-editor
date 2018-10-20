import gql from 'graphql-tag';

export default gql`
  mutation StoreImportServer(
    $projectId: String!
    $blocks: JSON
    $importType: String
  ) {
    storeImportServer(
      projectId: $projectId
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
