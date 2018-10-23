import { all, fork } from 'redux-saga/effects';

import itemsFinder from './projectEntriesFinder/itemsFinder';

export default function* defaultSaga() {
  yield all([fork(itemsFinder)]);
}
