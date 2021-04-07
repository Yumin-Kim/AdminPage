import { group } from 'node:console';
import { userInfo } from 'node:os';
import { Admindashboards, Admins } from 'src/admin/entities/admin.entity';
import { FacilityInfos } from 'src/facility/entities/facility.entity';
import { Petitions } from 'src/petition/entities/petition.entity';
import { PricingInfos } from 'src/pricing/entities/pricing.entity';
import { ParkingInfos, UserCarInfos } from 'src/usercar/entities/usercar.entity';
import { VotingInfos } from 'src/voting/entities/voting.entity';
import { Column, Entity , JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Images } from './image.entity';
import { OutterUsers } from './outter.entity';

@Entity("groups")
export class Group{

  @PrimaryGeneratedColumn()
  id:number

  @Column({type:"int"})
  name:number

  @Column({type:"int"})
  minWeight:number
  
  @Column({type:"int"})
  maxWeight:number

  @Column({type:"datetime"})
  createdAt:Date
  
  @Column({type:"datetime"})
  updatedAt:Date
  
  @Column({type:"int"})
  roomCount:number
  
  @Column({type:"int"})
  pricing:number

  @OneToMany(type=>User , user=>user.group)
  users:User[]

  @OneToMany(type=>GroupByGroups , groupbygroup=>groupbygroup.group)
  groupbygroups:GroupByGroups[]

  @OneToMany(type=>AccessMembers , accessmembers => accessmembers.group)
  accessmembers:AccessMembers[]

  @OneToMany(type=>VotingInfos , VotingInfos=>VotingInfos.group)
  votingInfos:VotingInfos[]

  @OneToMany(type=>UserCarInfos , userCarInfos => userCarInfos.group)
  userCarInfos:UserCarInfos[]

  @OneToMany(type=>ParkingInfos , parkingInfos=>parkingInfos.group)
  parkingInfos:ParkingInfos[]

  @OneToMany(type=>PricingInfos , pricingInfos=>pricingInfos.group)
  pricingInfos:PricingInfos[]

  @OneToMany(type=>Petitions , petitions=>petitions.group)
  petitions:Petitions[]

  @OneToMany(type=>OutterUsers , outterusers=>outterusers.group)
  outterusers:OutterUsers[]

  @OneToMany(type=>FacilityInfos , facilityInfos=>facilityInfos.group)
  facilityInfos:FacilityInfos[]

  @OneToMany(type=>Admins , admins=>admins.group)
  admins:Admins[]

  @OneToMany(type=>Admindashboards , admindashboard=>admindashboard.group)
  admindashboard:Admindashboards[]
  
}


@Entity("groupbygroups")
export class GroupByGroups{
  
  @PrimaryGeneratedColumn()
  id : number

  @Column({type:"int"})
  name: number 

  @Column({type:"int"})
  repairCount:number
  
  @Column({type:"datetime"})
  createdAt:Date
  
  @Column({type:"datetime"})
  updatedAt:Date
  
  @Column({type:"datetime"})
  deletedAt:Date
  
  @Column({type:"varchar",length:255})
  housePassword:string
  
  @Column({type:"int"})
  pricing:number

  @ManyToOne(type=>Group , group =>group.groupbygroups)
  group:Group
  
  @OneToMany(type=>User ,user=>user.groupbygroup)
  users:User[]

  @OneToMany(type=>AccessMembers , accessmembers =>accessmembers.groupbygroups)
  accessmembers:AccessMembers[]

  @OneToMany(type=>VotingInfos , votingInfos=>votingInfos.groupbygroup)
  votingInfos:VotingInfos[]

  @OneToMany(type=>UserCarInfos , UserCarInfos=>UserCarInfos.groupbygroup)
  UserCarInfos:UserCarInfos[]

  @OneToMany(type=>ParkingInfos , parkingInfos=>parkingInfos.groupbygroup)
  parkingInfos:ParkingInfos[]

  @OneToMany(type=>PricingInfos , pricingInfos=>pricingInfos.groupbygroup)
  pricingInfos:PricingInfos[]

  @OneToMany(type=>Petitions , petitions=>petitions.groupbygroup)
  petitions:Petitions[]

  @OneToMany(type=>OutterUsers , outterusers=>outterusers.groupbygroup)
  outterusers:OutterUsers[]

  @OneToMany(type=>FacilityInfos , facilityInfos=>facilityInfos.groupbygroup)
  facilityInfos:FacilityInfos[]

}
@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id:number

  @Column({type:"varchar",length:100})
  name:string

  @Column({type:"int"})
  memberIndex:number

  @Column({type:"bool"})
  host:boolean
  
  @Column({type:"datetime"})
  craetedAt:Date
  
  @Column({type:"datetime"})
  updatedAt:Date
  
  @Column({type:"datetime"})
  deletedAt:Date
  
  @Column({type:"date"})
  birth:Date

  @Column({type:"varchar",length:50})
  phoneNumber:string

  @ManyToOne(type=>Group , group=>group.users)
  group:Group

  @ManyToOne(type=>GroupByGroups , groupbygroup=>groupbygroup.users)
  groupbygroup:GroupByGroups

  @OneToMany(type=>AccessMembers , accessmembers =>accessmembers.user)
  accessmembers:AccessMembers[]

  @OneToMany(type=>VotingInfos , votingInfos =>votingInfos.user)
  votingInfos:VotingInfos[]
  
  @OneToMany(type=>UserCarInfos , userCarInfos =>userCarInfos.user)
  userCarInfos:UserCarInfos[]

  @OneToMany(type=>ParkingInfos , parkinginfos =>parkinginfos.user)
  parkinginfos:ParkingInfos[]

  @OneToMany(type=>PricingInfos , pricingInfos=>pricingInfos.user)
  pricingInfos:PricingInfos[]
  
  @OneToMany(type=>Petitions , petitions=>petitions.user)
  petitions:Petitions[]

  @OneToMany(type=>OutterUsers , outterusers=>outterusers.user)
  outterusers:OutterUsers[]

  @OneToMany(type=>FacilityInfos , facilityInfos=>facilityInfos.user)
  facilityInfos:FacilityInfos[]
  
  @ManyToMany(type=>AccessMembers)
  @JoinTable()
  M_accessmembers:AccessMembers[]

  @ManyToMany(type=>Images)
  @JoinTable()
  M_images:Images[]

}


@Entity("accessmembers")
export class AccessMembers{

  @PrimaryGeneratedColumn()
  id:number
  
  @Column({type:"datetime"})
  admisssionTime:Date

  @ManyToOne(type=>User , user=>user.accessmembers)
  user:User

  @ManyToOne(type=>Group , group=>group.accessmembers)
  group:Group

  @ManyToOne(type=>GroupByGroups , groupbygroups=>groupbygroups.accessmembers)
  groupbygroups:GroupByGroups

  @ManyToOne(type=>Admins , admins=>admins.accessmembers)
  admins:Admins

  @ManyToOne(type=>OutterUsers , outterusers=>outterusers.accessmembers)
  outterusers:OutterUsers
  

}


