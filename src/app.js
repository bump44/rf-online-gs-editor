/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { ApolloProvider } from 'react-apollo';
import { writeFileSync } from 'fs';
import path from 'path';
import unhandled from 'electron-unhandled';

import LanguageProvider from './containers/LanguageProvider';
import configureStore from './configureStore';
import apolloClient from './apollo';
import history from './utils/history';
import { loadState } from './utils/ls';
import { translationMessages } from './i18n';

// Create redux store with history
const initialState = loadState() || {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');
const unhandledErrorLogPath = path.resolve('./', 'unhandled_error_log.txt');

const render = messages => {
  const App = require('./containers/App').default; // eslint-disable-line

  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ApolloProvider client={apolloClient}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </ApolloProvider>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(() => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

render(translationMessages);

// Handle unhandled error/unhandledrejection
unhandled({
  logger: error =>
    writeFileSync(
      unhandledErrorLogPath,
      `${error.message}\r\n
\r\n
Stack:\r\n
${error.stack}
`,
    ),
});
