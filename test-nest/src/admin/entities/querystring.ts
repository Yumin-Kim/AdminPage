export interface IBasicQuery {
  offset: number;
  limit: number;
}

export interface ISignUpDayQuery {
  [day: string]: number;
}
