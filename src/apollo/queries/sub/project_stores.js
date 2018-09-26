import gql from 'graphql-tag';

export default gql`
  query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
    projectStores(take: $take, skip: $skip, sort: $sort, where: $where) {
      items {
        id
        nIndex

        client {
          strStoreNPCname
        }
      }
      total
    }
  }
`;
