import gql from 'graphql-tag';
import ProjectItemClientNameParts from '../../fragments/ProjectItemClientNameParts';
import ProjectItemServerNameParts from '../../fragments/ProjectItemServerNameParts';

export default gql`
  query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
    projectItems(take: $take, skip: $skip, sort: $sort, where: $where) {
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
          ...ProjectItemClientNameParts
        }
        server {
          ...ProjectItemServerNameParts
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
  ${ProjectItemClientNameParts}
  ${ProjectItemServerNameParts}
`;
