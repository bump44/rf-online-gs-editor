import { all, fork } from 'redux-saga/effects';
import projectImportSaga from './sagas/projectImportSaga';
import projectItemSaga from './sagas/projectItemSaga';

export default function* defaultSaga() {
  yield all([fork(projectImportSaga), fork(projectItemSaga)]);
}
