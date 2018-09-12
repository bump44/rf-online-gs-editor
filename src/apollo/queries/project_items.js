import gql from 'graphql-tag';

export default gql`
  query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
    projectItems(take: $take, skip: $skip, sort: $sort, where: $where) {
      items {
        type
        nIndex
        searchTextValue
        client {
          strName
        }
      }
      total
    }
  }
`;
