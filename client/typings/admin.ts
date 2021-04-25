import { DashBoardEntitiy, DayEntity, GroupEntitiy, ParkingInfoEntity } from './Entitiy';

export interface AdminStore {
  dashboardInfo: Array<DashBoardEntitiy>;
  dashboardInfoLoading: boolean;
  updateDashboardInfoLoading: boolean;
  updateDashboardInfoError: boolean;
  updateDashboardInfoSuccess: boolean;
  createDashboardInfoLoading: boolean;
  createDashboardInfoError: boolean;
  createDashboardInfoSuccess: boolean;
  regiaterInnerInfoLoading: boolean;
  regiaterOutterInfoLoading: boolean;
  message: string;
  adminsInfo: T_AdminInfo;
  chartInfo: {
    userChartInfo: {
      data: Array<UserTableChart>;
      loding: boolean;
    };
    parkingChartInfo: {
      data: Array<Array<ParkingInfoEntity>> | [];
      loading: boolean;
    };
    exitUserChartInfo: {
      data: Array<{ length: number; admissionTime: Date }> | [];
      loaging: boolean;
    };
    totalCountInfo: {
      data: Record<U_TotalTable, number> | {};
      loadging: boolean;
    };
  };
}

export interface ResultChartUser {
  minGroupId: number;
  maxGroupId: number;
  totalCount: number;
  userTable: UserTableChart;
}

export interface UserTableChart {
  host: {
    [hostInfo in 'false' | 'true']: number;
  };
  memberIndex: {
    [key in '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9']: number;
  };
}

export interface DateChart {
  year: number;
  date: number;
  count: number;
}

export const TotalTable = [
  'user',
  'group',
  'groupbygroup',
  'image',
  'imageoutter',
  'outter',
  'admin',
  'votingInfo',
  'parkingInfo',
] as const;
export type U_TotalTable = typeof TotalTable[number];
type aa = typeof TotalTable;
export type TotalTableClass = Record<U_TotalTable, boolean>;
type aa12 = keyof DateChart;

export interface LoginAdmin {
  email: string;
  password: string;
}

export interface SignUpAdmin {
  name: string;
  password: string;
  email: string;
  group: number;
  M_days: number[];
}

export interface T_AdminInfo {
  user?: {
    id: number;
    name: string;
    password: string;
    email: string;
    group: GroupEntitiy;
    M_days: Array<DayEntity>;
  };
  token: string;
}
