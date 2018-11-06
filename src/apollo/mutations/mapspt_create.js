import gql from 'graphql-tag';
import MapSptNameParts from '../fragments/MapSptNameParts';

export default gql`
  mutation MapSptCreate($projectId: String!, $values: JSON) {
    mapSptCreate(projectId: $projectId, values: $values) {
      id
      ...MapSptNameParts
    }
  }

  ${MapSptNameParts}
`;
