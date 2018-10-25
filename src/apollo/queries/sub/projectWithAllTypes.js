import gql from 'graphql-tag';
import ProjectIncludeAllTypes from '~/apollo/fragments/ProjectIncludeAllTypes';

export default gql`
  query($id: String!) {
    project(id: $id) {
      title
      name
      id

      ...ProjectIncludeAllTypes
    }
  }

  ${ProjectIncludeAllTypes}
`;
