import { SignUpAdmin_ACTIONS } from '@actions/admin/admin';
import { AdminStore } from '@typings/admin';
import { LOGIN, SIGNUP } from '@actions/admin/type';
import { T_LoginAdminAction, T_TestLoginActions } from '../actions/admin/admin';
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
const adminReducer = (state = AdmininitialState, action: SignUpAdmin_ACTIONS | T_TestLoginActions): AdminStore => {
  switch (action.type) {
    case SIGNUP.REQUEST:
      return state;
    case SIGNUP.SUCCESS:
      const data = action.payload;
      state = { ...state };
      // state.message = action.payload.data
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
    default:
      return state;
  }
};

export default adminReducer;
