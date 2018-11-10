import gql from 'graphql-tag';

export default gql`
  mutation SkillForceImportClient(
    $projectId: String!
    $type: String!
    $blocks: JSON
    $importType: String
  ) {
    skillForceImportClient(
      projectId: $projectId
      type: $type
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
