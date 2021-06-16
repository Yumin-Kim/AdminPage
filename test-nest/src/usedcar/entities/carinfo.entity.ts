import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('usedcarinfos')
export class UsedCarInfos1 {
  @PrimaryColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'int' })
  useregion: number;
  @Column({ type: 'int' })
  movedistance: number;
  @Column({ type: 'int' })
  price: number;
  @Column({ type: 'varchar', length: 50 })
  fuel: string;
  @Column({ type: 'varchar', length: 50 })
  transmission: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  color: string;
  @Column({ type: 'varchar', length: 50 })
  carnumber: string;
}

@Entity('usedcarinfos2')
export class UsedCarInfos2 {
  @PrimaryColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  transmission?: string;
  @Column({ type: 'int', nullable: true })
  acceptuser?: number;
  @Column({ type: 'int', nullable: true })
  cylinder?: number;
  @Column({ type: 'int', nullable: true })
  carpower?: number;
  @Column({ type: 'varchar', length: 50, nullable: true })
  maxtorque?: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  fuel?: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  movedistance?: string;
  @Column({ type: 'int', nullable: true })
  price?: number;
}
