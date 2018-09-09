import gql from 'graphql-tag';

export default gql`
  mutation UserRegister($login: String!, $email: String!, $password: String!) {
    userRegister(login: $login, email: $email, password: $password) {
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
