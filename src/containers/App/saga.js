import { all, fork } from 'redux-saga/effects';
import projectImportSaga from './sagas/projectImportSaga';

export default function* defaultSaga() {
  yield all([fork(projectImportSaga)]);
}
