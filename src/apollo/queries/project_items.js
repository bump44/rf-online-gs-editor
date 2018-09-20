import gql from 'graphql-tag';
import ProjectItemClientNameParts from '../fragments/ProjectItemClientNameParts';
import ProjectItemServerNameParts from '../fragments/ProjectItemServerNameParts';

export default gql`
  query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
    projectItems(take: $take, skip: $skip, sort: $sort, where: $where) {
      items {
        id
        type
        nIndex
        searchTextValue
        client {
          ...ProjectItemClientNameParts
        }
        server {
          ...ProjectItemServerNameParts
        }
      }
      total
    }
  }

  # include fragments
  ${ProjectItemClientNameParts}
  ${ProjectItemServerNameParts}
`;
