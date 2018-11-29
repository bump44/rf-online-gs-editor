const DEV = {
  GRAPHQL_ENDPOINT: 'http://localhost:3010/graphql',
};

const PROD = {
  GRAPHQL_ENDPOINT: 'http://37.46.135.83:3010/graphql',
};

export default (process.env.NODE_ENV !== 'production' ? DEV : PROD);
