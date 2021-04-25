export interface DashBoardEntitiy {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  group: GroupEntitiy;
  admin: AdminEntitiy;
}

export interface AdminEntitiy {
  id: number;
  name: string;
  password: string;
  email: string;
  group: GroupEntitiy;
}

export interface GroupEntitiy {
  id: number;
  name: number;
  minWeight: number;
  maxWeight: number;
  createdAt: Date;
  updatedAt: Date;
  roomCount: number;
  pricing: number;
}
export interface GroupByGroupsEntity {
  id: number;
  name: number;
  repairCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  housePassword: string;
  pricing: number;
  group: GroupEntitiy;
}

export interface DayEntity {
  id: number;
  name: string;
}

export interface ParkingInfoEntity {
  id: number;
  space: string;
  valid: boolean;
  startTime: Date;
  EndTime: Date;
  specificSpace: boolean;
  user: UserEntity;
  group: GroupEntitiy;
  groupbygroup: GroupByGroupsEntity;
  userCarInfo: UserCarInfoEntity;
}

export interface UserCarInfoEntity {
  id: number;
  kind: string;
  carCode: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  user: UserEntity;
  group: GroupEntitiy;
  groupbygroup: GroupByGroupsEntity;
}

export interface UserEntity {
  id: number;
  name: string;
  memberIndex: number;
  host: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  birth: Date;
  phoneNumber: string;
  group: GroupEntitiy;
  groupbygroup: GroupByGroupsEntity;
}
