import gql from 'graphql-tag';
import ItemClientNameParts from 'apollo/fragments/ItemClientNameParts';
import ItemServerNameParts from 'apollo/fragments/ItemServerNameParts';

export default gql`
  query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
    items(take: $take, skip: $skip, sort: $sort, where: $where) {
      items {
        id
        type
        nIndex
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
      }
      total
    }
  }

  # include fragments
  ${ItemClientNameParts}
  ${ItemServerNameParts}
`;
