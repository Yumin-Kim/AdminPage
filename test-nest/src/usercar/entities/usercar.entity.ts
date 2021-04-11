import { Group, GroupByGroups, User } from "src/user/entities/users.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("usercarinfos")
export class UserCarInfos{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({type:"varchar",length:100})
    kind:string

    @Column({type:"varchar",length:100})
    carCode:string

    @Column({type:"datetime"})
    createdAt:Date

    @Column({type:"datetime"})
    updatedAt:Date
    
    @Column({type:"datetime"})
    deletedAt:Date
    
    @ManyToOne(type=>User , user=>user.userCarInfos)
    user:User

    @ManyToOne(type=>Group , group=>group.userCarInfos)
    group:Group

    @ManyToOne(type=>GroupByGroups , groupByGroup => groupByGroup.UserCarInfos)
    groupbygroup :GroupByGroups

    @OneToMany(type=>ParkingInfos , parkingInfos => parkingInfos.userCarInfos)
    parkingInfos:ParkingInfos[]
    
}

@Entity("parkinginfos")
export class ParkingInfos{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({type:"varchar",length:100})
    space:string
    
    @Column({type:"boolean"})
    valid:boolean

    @Column({type:"time"})
    startTime:Date
    
    @Column({type:"time"})
    EndTime:Date
    
    @Column({type:"boolean"})
    specificSpace:boolean

    
    @ManyToOne(type=>User , user=>user.parkinginfos)
    user:User
    
    @ManyToOne(type=>Group , group=>group.parkingInfos)
    group:Group
    
    @ManyToOne(type=>GroupByGroups , groupByGroups=>groupByGroups.parkingInfos)
    groupbygroup:GroupByGroups
    
    @ManyToOne(type=>UserCarInfos , userCarInfos=>userCarInfos.parkingInfos)
    userCarInfos:UserCarInfos
}
