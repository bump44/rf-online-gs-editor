import { all, fork } from 'redux-saga/effects';
import projectImportSaga from './sagas/projectImportSaga';
import projectNextValueSaga from './sagas/projectNextValueSaga';
import projectEntriesFinder from './sagas/projectEntriesFinder';

export default function* defaultSaga() {
  yield all([
    fork(projectImportSaga),
    fork(projectNextValueSaga),
    fork(projectEntriesFinder),
  ]);
}
