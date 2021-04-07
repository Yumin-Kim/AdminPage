import { Petitions } from "src/petition/entities/petition.entity"
import { Group, GroupByGroups, User } from "src/user/entities/users.entity"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"



@Entity("facilitytoollists")
export class FacilityToolLists{

    @PrimaryGeneratedColumn()
    id:number
    
    @Column({type:"varchar" , length:50})
    name:string
    
    @Column({type:"int"})
    pricing:number
    
    @Column({type:"int"})
    stock:number
    
    @Column({type:"datetime"})
    createdAt:Date
    
    @Column({type:"datetime"})
    updatedAt:Date

    @Column({type:"datetime"})
    deletedAt:Date
    
}

@Entity("facilityroomlists")
export class FacilityRoomLists{

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"varchar" , length:50})
    title:string

    @Column({type:"varchar",length:50})
    name:string

    @Column({type:"int"})
    pricing:number

    @Column({type:"int"})
    capacity:number
    
    @Column({type:"int"})
    employment:number

    @Column({type:"datetime"})
    createdAt:Date

    @Column({type:"datetime"})
    updatedAt:Date

    @Column({type:"datetime"})
    deletedAt:Date
}

@Entity("facilityinfos")
export class FacilityInfos{

    @PrimaryGeneratedColumn()
    id :number

    @Column({type:"text"})
    description:string

    @Column({type:"int"})
    quantiy:number

    @Column({type:"datetime"})
    createdAt:Date

    @Column({type:"datetime"})
    updatedAt:Date

    @Column({type:"datetime"})
    deletedAt:Date

    @ManyToOne(type=>User , user=>user.facilityInfos)
    user:User
    
    @ManyToOne(type=>Group , group=>group.facilityInfos)
    group:Group
    
    @ManyToOne(type=>GroupByGroups , groupByGroups=>groupByGroups.facilityInfos)
    groupbygroup:GroupByGroups
    
    @ManyToOne(type=>Petitions , petitions=>petitions.facilityInfos)
    petition:Petitions

    @ManyToMany(type=>FacilityRoomLists)
    @JoinTable()
    M_facilityroomlist:FacilityRoomLists
    
    @ManyToMany(type=>FacilityToolLists)
    @JoinTable()
    M_facilitytoollist:FacilityToolLists

}