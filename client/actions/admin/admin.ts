import axios from 'axios';
////////////////////////////////
import { createAction, createEntityAction, EntityAction } from '@typings/actions';
import { LoginAdmin, SignUpAdmin, T_AdminInfo } from '@typings/admin';
import { LOGIN_ADMIN, SIGNUP, LOGIN } from '@actions/admin/type';

axios.defaults.baseURL = 'http://localhost:3000/api';

export const signupAPI = async (signupData: SignUpAdmin) => {
  return await axios.post<SignUpAdmin>(`/admin/signup`, signupData);
};

export const loginAPI = async (loginInfo: LoginAdmin): Promise<T_AdminInfo> => {
  return await (await axios.post<T_AdminInfo>('/admin/login', loginInfo)).data;
};
export const testloginAPI = async (loginInfo: LoginAdmin) => {
  return (await axios.post<T_AdminInfo>('/admin/login', loginInfo)).data;
};

export const signupAdmin = (payload: SignUpAdmin) => ({ type: LOGIN_ADMIN, payload });
export type SignUpAdmin_ACTION = ReturnType<typeof signupAdmin>;

export const signupAdmin_action = createEntityAction(SIGNUP, signupAPI);
export type SignUpAdmin_ACTIONS = EntityAction<typeof signupAdmin_action>;

export type SignUpActions = SignUpAdmin_ACTION | SignUpAdmin_ACTIONS;

export const loginAdminActions = createEntityAction(LOGIN, loginAPI);
export type T_LoginAdminAction = EntityAction<typeof loginAdminActions>;

export const testloginActions = createAction(LOGIN, testloginAPI);
export type T_TestLoginActions = EntityAction<typeof testloginActions>;
