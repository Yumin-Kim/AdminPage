interface IFacilityInfoTable {
  //   user.name : string;
  //   group.name : number;
  //   groupByGroup.name : number;
  //   petitions.stage : string;
  //   petitions.kind : string;
  //   facility_List.admins.name : string;

  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  description: string;
  quarity: number;
}

interface IFacilityToolsListTable {
  name: string;
  pricing: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  stock?: number;
}

interface IFacilityRoomsListsTable extends IFacilityToolsListTable {
  title: string;
  capacity: number;
  employment: number;
}

export interface IBasicQuery {
  offset: number;
  limit: number;
}
