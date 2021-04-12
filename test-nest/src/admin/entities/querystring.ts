import { UpdateUserDto } from 'src/user/dtos/update-user.dto';

export interface IBasicQuery {
  offset: number;
  limit: number;
}

export interface ISignUpDayQuery {
  [day: string]: number;
}
export class ResultChartUser {
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
// export class TotalTable{
//   [key in ]
// }
