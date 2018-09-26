import { all, fork } from 'redux-saga/effects';
import projectImportSaga from './sagas/projectImportSaga';
import projectNextValueSaga from './sagas/projectNextValueSaga';

export default function* defaultSaga() {
  yield all([fork(projectImportSaga), fork(projectNextValueSaga)]);
}
