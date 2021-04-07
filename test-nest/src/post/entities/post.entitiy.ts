import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
export class Posts{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar" , length:255})
    slug:string;

    @Column({type:"varchar" , length:255})
    desctiption:string;
}

export interface UserInfo{
    slug:string;
    description:string;
}