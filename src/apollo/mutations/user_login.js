import gql from 'graphql-tag';

export default gql`
  mutation UserLogin($indent: String!, $password: String!) {
    userLogin(indent: $indent, password: $password) {
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
