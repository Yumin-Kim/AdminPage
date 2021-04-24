import { delay, put, takeEvery, all } from 'redux-saga/effects';
import { SCORE_UP_ASYNC, SCORE_DOWN_ASYNC, SCORE_UP, SCORE_DOWN } from './constants';

function* scoreUpAsync() {
  yield delay(2000);
  yield put({ type: SCORE_UP_ASYNC, score: 1 });
}
function* scoreDownAsync() {
  yield delay(2000);
  yield put({ type: SCORE_DOWN_ASYNC, score: 1 });
}
function* watchScoreUp() {
  yield takeEvery(SCORE_UP, scoreUpAsync);
}
function* watchScoreDown() {
  yield takeEvery(SCORE_DOWN, scoreDownAsync);
}
export default function* rootSaga() {
  yield all([watchScoreDown(), watchScoreUp()]);
}
