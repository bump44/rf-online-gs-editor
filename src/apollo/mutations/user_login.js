import gql from 'graphql-tag';

export default gql`
  mutation UserLogin($ident: String!, $password: String!) {
    userLogin(ident: $ident, password: $password) {
      token
      user {
        id
        login
        email
        role {
          id
          name
          title
        }
      }
    }
  }
`;
