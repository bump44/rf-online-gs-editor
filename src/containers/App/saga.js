import { all, fork } from 'redux-saga/effects';

import projectEntriesFinderSaga from './sagas/projectEntriesFinderSaga';
import projectExportSaga from './sagas/projectExportSaga';
import projectImportSaga from './sagas/projectImportSaga';
import projectImportServerMapsSaga from './sagas/projectImportServerMapsSaga';
import projectNextValueSaga from './sagas/projectNextValueSaga';

export default function* defaultSaga() {
  yield all([
    fork(projectImportSaga),
    fork(projectImportServerMapsSaga),
    fork(projectExportSaga),
    fork(projectNextValueSaga),
    fork(projectEntriesFinderSaga),
  ]);
}
