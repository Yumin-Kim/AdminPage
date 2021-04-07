import { OutterUsers } from "src/user/entities/outter.entity"
import { AccessMembers, Group } from "src/user/entities/users.entity"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("admins")
export class Admins{

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"varchar",length:50})
    name:string
    
    @Column({type:"varchar",length:50})
    password:string
    
    @Column({type:"varchar",length:100})
    email:string
    
    @ManyToOne(type=>Group , group=>group.admins)
    group:Group

    @OneToMany(type=>Admindashboards , admindashboard=>admindashboard.admin)
    admindashboard:Admindashboards[]

    @OneToMany(type=>AccessMembers , accessmembers=>accessmembers.admins)
    accessmembers:AccessMembers[]

    @ManyToMany(type=>Days)
    @JoinTable()
    M_days:Days[]
}

@Entity("admindashboards")
export class Admindashboards{

    @PrimaryGeneratedColumn()
    id:number
    
    @Column({type:"varchar"})
    title:string
    
    @Column({type:"text"})
    description:string
    
    @Column({type:"datetime"})
    createdAt:Date
    
    @Column({type:"datetime"})
    updatedAt:Date
    
    @Column({type:"datetime"})
    deletedAt:Date

    @ManyToOne(type=>Admins , admin=>admin.admindashboard)
    admin:Admins

    @ManyToOne(type=>Group , group=>group.admindashboard)
    group:Admins
    
}

@Entity("days")
export class Days{
    
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"varchar",length:20})
    name:string
}
