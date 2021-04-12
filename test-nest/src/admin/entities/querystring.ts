import { UpdateUserDto } from "src/user/dtos/update-user.dto";

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
  userTable: UserTableChart
}

export interface UserTableChart {
  host: {
    [hostInfo in ("false" | "true")]: number
  };
  memberIndex: {
    [key in "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"]: number
  };
}