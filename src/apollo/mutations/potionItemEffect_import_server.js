import gql from 'graphql-tag';

export default gql`
  mutation PotionItemEffectImportServer(
    $projectId: String!
    $blocks: JSON
    $importType: String
  ) {
    potionItemEffectImportServer(
      projectId: $projectId
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
