import gql from 'graphql-tag';

export default gql`
  mutation StoreImportClient(
    $projectId: String!
    $blocks: JSON
    $importType: String
  ) {
    storeImportClient(
      projectId: $projectId
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
