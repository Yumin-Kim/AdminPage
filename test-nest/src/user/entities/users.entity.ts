import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"varchar" , length:255})
  name: string;

  @Column({type:"int"})
  age: number;

  @Column({type:"varchar" , length:10})
  address: string;
}
