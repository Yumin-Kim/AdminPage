// import { User } from "src/user/entities/users.entity";
// import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// @Entity("posts")
// export class Posts{
    
//     @PrimaryGeneratedColumn()
//     id:number;

//     @Column({type:"varchar" , length:255})
//     slug:string;

//     @Column({type:"varchar" , length:255})
//     description:string;

//     @ManyToOne(type=>User, user => user.posts)
//     user:User
// }

// export interface UserInfo{
//     slug:string;
//     description:string;
// }