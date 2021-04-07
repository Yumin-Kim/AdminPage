import { FacilityInfos } from "src/facility/entities/facility.entity"
import { Group, GroupByGroups, User } from "src/user/entities/users.entity"
import { Column, Entity,ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("petitions")
export class Petitions{

    @PrimaryGeneratedColumn()
    id:number
    
    @Column({type:"int"})
    title:number

    @Column({type:"text"})
    description:string

    @Column({type:"varchar", length:50})
    stage:string

    @Column({type:"varchar", length:50})
    kind:string

    @Column({type:"datetime"})
    createdAt:Date

    @Column({type:"datetime"})
    updatedAt:Date

    @Column({type:"datetime"})
    deletedAt:Date

    @ManyToOne(type=>User , user=>user.petitions)
    user:User
    
    @ManyToOne(type=>Group , group=>group.petitions)
    group:Group
    
    @ManyToOne(type=>GroupByGroups , groupByGroups=>groupByGroups.petitions)
    groupbygroup:GroupByGroups

    @OneToMany(type=>FacilityInfos , facilityInfos=>facilityInfos.petition)
    facilityInfos:FacilityInfos[]

}
