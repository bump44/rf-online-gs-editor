import gql from 'graphql-tag';

export default gql`
  mutation SkillForceImportServer(
    $projectId: String!
    $type: String!
    $blocks: JSON
    $importType: String
  ) {
    skillForceImportServer(
      projectId: $projectId
      type: $type
      blocks: $blocks
      importType: $importType
    ) {
      total
    }
  }
`;
