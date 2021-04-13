export class userCarQuery {
  carCode: string;
  createdAt: Date;
  kind: string;
  group: number;
  groupbygroup: number;
  user: string;
}

export class UserCarQueryDto {
  public carCode: string;
  public createdAt: Date;
  public kind: string;
  public group: number;
  public groupbygroup: number;
  public user: string;

  constructor({
    carCode,
    createdAt,
    kind,
    group,
    groupbygroup,
    user,
  }: Readonly<userCarQuery>) {
    this.carCode = carCode;
    this.createdAt = createdAt;
    this.kind = kind;
    if (groupbygroup !== undefined) this.groupbygroup = Number(groupbygroup);
    if (group !== undefined) this.group = Number(group);
    this.user = user;
  }

  filterGetObject(selfObject: userCarQuery) {
    Object.keys(selfObject).map((member) => {
      if (selfObject[member] === undefined) {
        delete selfObject[member];
      }
    });
    return selfObject;
  }
}
