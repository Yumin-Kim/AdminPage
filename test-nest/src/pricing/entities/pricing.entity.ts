import { Group, GroupByGroups, User } from "src/user/entities/users.entity"
import { Column, Entity,ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity("pricinginfos")
export class PricingInfos{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"varchar",length:50})
    kind:string
    
    @Column({type:"int"})
    pricing:number

    @Column({type:"datetime"})
    createdAt:Date

    @Column({type:"datetime"})
    deletedAt:Date
    
    @ManyToOne(type=>User , user=>user.pricingInfos)
    user:User
    
    @ManyToOne(type=>Group , group=>group.pricingInfos)
    group:Group
    
    @ManyToOne(type=>GroupByGroups , groupByGroups=>groupByGroups.pricingInfos)
    groupbygroup:GroupByGroups
}
