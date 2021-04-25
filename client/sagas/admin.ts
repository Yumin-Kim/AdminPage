import {
  SignUpActions,
  signupAdmin,
  signupAdmin_action,
  signupAPI,
  T_LoginAdminAction,
  loginAPI,
  loginAdminActions,
  testloginActions,
  testloginAPI,
} from '@actions/admin/admin';
import { SIGNUP, LOGIN } from '@actions/admin/type';
import axios from 'axios';
import { all, takeLatest, put, call, fork, CallEffect, SagaReturnType } from 'redux-saga/effects';
import { LoginAdmin, SignUpAdmin, T_AdminInfo } from '@typings/admin';
import { EntityAction } from '@typings/actions';
import { ResponseGenerator } from '../test/sagatest/SagaTypeTu';

function* signupAdminPost(action: SignUpActions) {
  try {
    const { data } = yield call(signupAPI, action.payload);
    console.log(data);

    yield put({
      type: SIGNUP.SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: SIGNUP.FAILURE, payload: error });
  }
}

function* watchSignAdmin() {
  yield takeLatest(SIGNUP.REQUEST, signupAdminPost);
}

function* loginAdmin(action: T_LoginAdminAction) {
  console.log('loginAdminsSaga');
  try {
    const data: T_AdminInfo = yield call(testloginAPI, action.payload);
    console.log(data);

    yield put(testloginActions.ACTION.SUCCESS(data));
  } catch (error) {
    yield put(loginAdminActions.ACTION.FAILURE(error));
  }
}

function* watchLoginAdmin() {
  yield takeLatest(LOGIN.REQUEST, loginAdmin);
}
export default function* adminSaga() {
  yield all([fork(watchSignAdmin), fork(watchLoginAdmin)]);
}
