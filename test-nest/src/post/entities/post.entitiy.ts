import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
export class Post{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar" , length:255})
    slug:string;
    @Column({type:"varchar" , length:255})
    excerpt:string;
    @Column({type:"varchar" , length:255})
    content:string;
    @Column({type:"varchar" , length:255})
    category:string;
    @Column({type:"varchar" , length:255})
    tags:string;
    @Column({type:"varchar" , length:255})
    status:string;

    @Column({type:"varchar" , length:255})
    title!:string;

    @Column({type:"varchar" , length:255})
    descripition:string;

    @CreateDateColumn({type:"timestamp"})
    createdAt:Date;
}