import gql from 'graphql-tag';

export default gql`
  mutation StoreCopy($id: String!) {
    storeCopy(id: $id) {
      id
    }
  }
`;
