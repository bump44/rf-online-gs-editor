import gql from 'graphql-tag';
import ProjectBoxItemOutNameParts from '../../fragments/ProjectBoxItemOutNameParts';

export default gql`
  query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
    projectBoxItemOuts(take: $take, skip: $skip, sort: $sort, where: $where) {
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

        ...ProjectBoxItemOutNameParts
      }
      total
    }
  }

  # include fragments
  ${ProjectBoxItemOutNameParts}
`;
