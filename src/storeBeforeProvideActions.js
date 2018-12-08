import pick from 'lodash/pick';
import throttle from 'lodash/throttle';

import { initialState as appInitialState } from './containers/App/reducer';
import { saveState } from './utils/ls';

function storeSaveState(store) {
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
              [
                'isLoggedIn',
                'currentUser',
                'currentUserToken',
                'localSettings',
              ],
            ),
          },
        }),
      1000,
    ),
  );
}

export default function storeBeforeProvideActions(store) {
  storeSaveState(store);
}
