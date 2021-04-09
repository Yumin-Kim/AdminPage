import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("images")
export class Images{
    
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"varchar" , length:255})
    name:number

    @Column({type:"int"})
    imageCount:number

    @Column({type:"datetime"})
    createdAt:Date

    @Column({type:"datetime"})
    updatedAt:Date
}

@Entity("outterimages")
export class OutterImages{
    
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"varchar", length:255})
    name:string

    @Column({type:"int"})
    imageCount:number

    @Column({type:"datetime"})
    createdAt:Date

    @Column({type:"datetime"})
    updatedAt:Date
}