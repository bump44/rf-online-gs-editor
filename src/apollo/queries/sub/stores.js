import gql from 'graphql-tag';
import StoreClientNameParts from '~/apollo/fragments/StoreClientNameParts';
import StoreServerNameParts from '~/apollo/fragments/StoreServerNameParts';

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
