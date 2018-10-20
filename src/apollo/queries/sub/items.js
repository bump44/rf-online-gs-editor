import gql from 'graphql-tag';
import ItemClientNameParts from '../../fragments/ItemClientNameParts';
import ItemServerNameParts from '../../fragments/ItemServerNameParts';

export default gql`
  query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
    items(take: $take, skip: $skip, sort: $sort, where: $where) {
      items {
        id
        type
        nIndex
        searchTextValue
        project {
          id
        }
        clientND {
          strName
        }
        client {
          ...ItemClientNameParts
        }
        server {
          ...ItemServerNameParts
        }
        stores {
          total
          items {
            id
            client {
              strStoreNPCname
              strStoreNPClastName
              strCode
            }
          }
        }
      }
      total
    }
  }

  # include fragments
  ${ItemClientNameParts}
  ${ItemServerNameParts}
`;
