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
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';
import createHistory from 'history/createMemoryHistory';
import throttle from 'lodash/throttle';
import pick from 'lodash/pick';

import LanguageProvider from './containers/LanguageProvider';
import configureStore from './configureStore';
import apolloClient from './apollo';
import { translationMessages } from './i18n';
import { loadState, saveState } from './utils/ls';
import { initialState as appInitialState } from './containers/App/reducer';

// Import CSS reset and Global Styles
import './global-styles';

// Create redux store with history
const initialState = loadState() || {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

store.subscribe(
  throttle(
    () =>
      saveState({
        global: {
          ...appInitialState.toJS(),
          ...pick(
            store
              .getState()
              .get('global')
              .toJS(),
            ['isLoggedIn', 'currentUser', 'currentUserToken'],
          ),
        },
      }),
    1000,
  ),
);

const render = messages => {
  const App = require('./containers/App').default; // eslint-disable-line

  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <ApolloProvider client={apolloClient}>
            <App />
          </ApolloProvider>
        </ConnectedRouter>
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

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
