const votingInfoList = ['title', 'description', 'createdAt', 'name'] as const;
export type IRegisterVotingInfoDto = Record<
  typeof votingInfoList[number],
  number | string | Date
>;
