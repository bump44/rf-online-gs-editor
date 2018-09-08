import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { loadTokenMe } from '../utils/ls';
import config from '../config';

const httpLink = createHttpLink({
  uri: config.GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const token = loadTokenMe();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== 'production',
});

export default apolloClient;
