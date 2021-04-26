import axios from 'axios';
////////////////////////////////
import { createAction, createActionFactory, createEntityAction, EntityAction } from '@typings/actions';
import { LoginAdmin, SignUpAdmin, T_AdminInfo } from '@typings/admin';
import { LOGIN_ADMIN, SIGNUP, LOGIN } from '@actions/admin/type';
import { RETRY_ADMIN_SINUP } from './type';

axios.defaults.baseURL = 'http://localhost:3000/api';

export const signupAPI = async (signupData: SignUpAdmin) => {
  return await axios.post<SignUpAdmin>(`/admin/signup`, signupData);
};

export const loginAPI = async (loginInfo: LoginAdmin) => {
  return (await axios.post<T_AdminInfo>('/admin/login', loginInfo)).data;
};

// export const signupAdmin = (payload: SignUpAdmin) => ({ type: LOGIN_ADMIN, payload });
// export type SignUpAdmin_ACTION = ReturnType<typeof signupAdmin>;

export const signupAdmin_action = createActionFactory(SIGNUP, signupAPI);
export type SignUpAdmin_ACTIONS = EntityAction<typeof signupAdmin_action>;

export type SignUpActions = SignUpAdmin_ACTIONS;

export const loginAdminActions = createActionFactory(LOGIN, loginAPI);
export type T_LoginAdminAction = EntityAction<typeof loginAdminActions>;

// export const testloginActions = createAction(LOGIN, testloginAPI);
// export type T_TestLoginActions = EntityAction<typeof testloginActions>;

export const retryAdminSignUpAction = () => ({
  type: RETRY_ADMIN_SINUP,
});
export type T_retryAdminSignUpAction = ReturnType<typeof retryAdminSignUpAction>;
