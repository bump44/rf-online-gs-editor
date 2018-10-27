import gql from 'graphql-tag';

export default gql`
  mutation StoreImportNpcharacter(
    $projectId: String!
    $blocks: JSON
    $importType: String
  ) {
    storeImportNpcharacter(
      projectId: $projectId
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
