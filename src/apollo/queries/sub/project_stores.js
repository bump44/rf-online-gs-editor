import gql from 'graphql-tag';
import ProjectStoreClientNameParts from '../../fragments/ProjectStoreClientNameParts';
import ProjectStoreServerNameParts from '../../fragments/ProjectStoreServerNameParts';

export default gql`
  query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
    projectStores(take: $take, skip: $skip, sort: $sort, where: $where) {
      items {
        id
        nIndex

        client {
          ...ProjectStoreClientNameParts
        }

        server {
          ...ProjectStoreServerNameParts
        }
      }
      total
    }
  }

  # include fragments
  ${ProjectStoreClientNameParts}
  ${ProjectStoreServerNameParts}
`;
