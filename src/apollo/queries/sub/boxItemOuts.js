import BoxItemOutNameParts from '~/apollo/fragments/BoxItemOutNameParts';
import gql from 'graphql-tag';

export default gql`
  query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
    boxItemOuts(take: $take, skip: $skip, sort: $sort, where: $where) {
      items {
        id
        nIndex
        project {
          id
        }
        item {
          id
          nIndex
          type
          project {
            id
          }
          client {
            strName
          }
          server {
            strName
          }
        }

        ...BoxItemOutNameParts
      }
      total
    }
  }

  # include fragments
  ${BoxItemOutNameParts}
`;
