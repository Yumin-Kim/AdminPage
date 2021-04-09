
export interface IBasicQuery{
    offset:number;
    limit:number;
}
export interface IFilterHumanQuery{
    host?:boolean;
    memberIndex?:number;
    phoneNumber?: string;
}
export interface IFilterRoomQuert{
    minWeight?:number;
    maxWeight?:number;
    name?:number;
    pricing?:number;
    roomCount?:number;
}

export interface IFilterGroupBy{
    name?:number;
    repairCount? : number;
    pricing?:number;
}

export type MergeHumanQueryString = IBasicQuery & IFilterHumanQuery
export type MergeRoomQueryString = IFilterRoomQuert  &IFilterGroupBy 

//querystrinfg Parse Function
export function parseQueryString<J extends T, T >(queryString:T, parseColumn : string[],mergeObj:J) :J {
    (Object.keys(queryString) as [keyof T]).map((value) => {
      return parseColumn.map((member) => {
        if (value === member){
          return ((mergeObj[value] as J[keyof J]) = queryString[member]);
        }
      });
    });
    return mergeObj
  }