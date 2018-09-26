import gql from 'graphql-tag';
import ProjectStoreClientNameParts from '../../fragments/ProjectStoreClientNameParts';

export default gql`
  query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
    projectStores(take: $take, skip: $skip, sort: $sort, where: $where) {
      items {
        id
        nIndex

        client {
          ...ProjectStoreClientNameParts
        }
      }
      total
    }
  }

  # include fragments
  ${ProjectStoreClientNameParts}
`;
