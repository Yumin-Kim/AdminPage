import { SignUpAdmin_ACTIONS } from '@actions/admin/admin';
import { AdminStore } from '@typings/admin';
import { LOGIN, SIGNUP } from '@actions/admin/type';
import { T_LoginAdminAction, T_retryAdminSignUpAction } from '@actions/admin/admin';
import { RETRY_ADMIN_SINUP } from '../actions/admin/type';
export const AdmininitialState: AdminStore = {
  dashboardInfo: [],
  dashboardInfoLoading: false,
  updateDashboardInfoLoading: false,
  updateDashboardInfoError: false,
  updateDashboardInfoSuccess: false,
  createDashboardInfoLoading: false,
  createDashboardInfoError: false,
  createDashboardInfoSuccess: false,
  regiaterInnerInfoLoading: false,
  regiaterOutterInfoLoading: false,
  message: '',
  adminsInfo: {
    token: '',
  },
  chartInfo: {
    userChartInfo: {
      data: [],
      loding: false,
    },
    parkingChartInfo: {
      data: [],
      loading: false,
    },
    exitUserChartInfo: {
      data: [],
      loaging: false,
    },
    totalCountInfo: {
      data: {},
      loadging: false,
    },
  },
};
const adminReducer = (
  state = AdmininitialState,
  action: SignUpAdmin_ACTIONS | T_LoginAdminAction | T_retryAdminSignUpAction,
): AdminStore => {
  switch (action.type) {
    case SIGNUP.REQUEST:
      return state;
    case SIGNUP.SUCCESS:
      const { message } = (action.payload as unknown) as Pick<AdminStore, 'message'>;
      state = { ...state, message };
      return state;
    case LOGIN.REQUEST:
      return state;
    case LOGIN.SUCCESS:
      const { user, token } = action.payload;
      return {
        ...state,
        adminsInfo: {
          user,
          token,
        },
      };
    case LOGIN.FAILURE:
      console.log();

      return {
        ...state,
        message: action.payload.message,
      };
    case RETRY_ADMIN_SINUP:
      return {
        ...state,
        message: '',
      };
    default:
      return state;
  }
};

export default adminReducer;
