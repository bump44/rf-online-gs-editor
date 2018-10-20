import gql from 'graphql-tag';
import StoreClientNameParts from '../../fragments/StoreClientNameParts';
import StoreServerNameParts from '../../fragments/StoreServerNameParts';

export default gql`
  query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
    stores(take: $take, skip: $skip, sort: $sort, where: $where) {
      items {
        id
        nIndex

        project {
          id
        }

        client {
          ...StoreClientNameParts
        }

        server {
          ...StoreServerNameParts
        }
      }
      total
    }
  }

  # include fragments
  ${StoreClientNameParts}
  ${StoreServerNameParts}
`;
