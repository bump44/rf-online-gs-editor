import gql from 'graphql-tag';

export default gql`
  query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
    projectBoxItemOuts(take: $take, skip: $skip, sort: $sort, where: $where) {
      items {
        id
        nIndex
        project {
          id
        }
      }
      total
    }
  }
`;
