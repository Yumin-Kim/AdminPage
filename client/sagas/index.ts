import { all, call } from 'redux-saga/effects';
import adminSaga from './admin';

export default function* RootSaga() {
  yield all([call(adminSaga)]);
}
