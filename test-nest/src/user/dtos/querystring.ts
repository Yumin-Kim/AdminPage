import { LessThan, MoreThan } from "typeorm";

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

export interface IFilterFullTable extends IFilterRoomQuert {
  offset?:number;
  limit?:number;
  c_name?:number;
  c_pricing?:number;
  repairCount?:number;
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
//add[parse] querystring Object.property  >> Less , Morethan  
  export function filterGroup_GroupByObject<T>(queryStringObj :T , DesireArray: (keyof T)[]){
    return Object.keys(queryStringObj).reduce((prev , cur , index) : T=>{
      (DesireArray).map((value)=>{
        if(value === cur){
          if(value === "pricing"  || value === "maxWeight")
            return prev[cur] = LessThan(queryStringObj[value]);
          else if(value === "minWeight")
            return prev[cur] = MoreThan(queryStringObj[value]);
          else
            return prev[value] = queryStringObj[value];
        }
      })
      return prev
    },{} as T) 
  }