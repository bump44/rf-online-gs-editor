import { all, fork } from 'redux-saga/effects';
import projectImportSaga from './sagas/projectImportSaga';
import projectImportServerMapsSaga from './sagas/projectImportServerMapsSaga';
import projectExportSaga from './sagas/projectExportSaga';
import projectNextValueSaga from './sagas/projectNextValueSaga';
import projectEntriesFinderSaga from './sagas/projectEntriesFinderSaga';

export default function* defaultSaga() {
  yield all([
    fork(projectImportSaga),
    fork(projectImportServerMapsSaga),
    fork(projectExportSaga),
    fork(projectNextValueSaga),
    fork(projectEntriesFinderSaga),
  ]);
}
