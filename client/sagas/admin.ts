import { SignUpActions, signupAPI, T_LoginAdminAction, loginAPI, loginAdminActions } from '@actions/admin/admin';
import { SIGNUP, LOGIN } from '@actions/admin/type';
import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import { T_AdminInfo, AdminStore } from '@typings/admin';

function* signupAdminPost(action: SignUpActions) {
  try {
    if (action.type === 'ADMIN_SIGNUP_REQUEST') {
      const { data } = yield call(signupAPI, action.payload);
      yield put({
        type: SIGNUP.SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: SIGNUP.FAILURE, payload: error });
  }
}

function* watchSignAdmin() {
  yield takeLatest(SIGNUP.REQUEST, signupAdminPost);
}

function* loginAdmin(action: T_LoginAdminAction) {
  if (action.type === 'LOGIN_ADMIN_REQUEST') {
    const data: T_AdminInfo = yield call(loginAPI, action.payload);
    // if(typeof data is T_AdminInfo)

    if (data.user) yield put(loginAdminActions.ACTION.SUCCESS(data));
    else yield put(loginAdminActions.ACTION.FAILURE((data as unknown) as Pick<AdminStore, 'message'>));
  }
  //
}

function* watchLoginAdmin() {
  yield takeLatest(LOGIN.REQUEST, loginAdmin);
}

export default function* adminSaga() {
  yield all([fork(watchSignAdmin), fork(watchLoginAdmin)]);
}
