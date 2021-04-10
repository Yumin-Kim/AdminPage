import { Admins } from 'src/admin/entities/admin.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OutterImages } from './image.entity';
import { AccessMembers, Group, GroupByGroups, User } from './users.entity';

@Entity('outters')
export class OutterUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 50 })
  phoneNumber: string;

  @ManyToOne((type) => User, (user) => user.outterusers)
  user: User;

  @ManyToOne((type) => Group, (group) => group.outterusers)
  group: Group;

  @ManyToOne(
    (type) => GroupByGroups,
    (groupbygroup) => groupbygroup.outterusers,
  )
  groupbygroup: GroupByGroups;

  // @ManyToOne((type) => Admins, (admin) => admin.outterusers)
  // admin: Admins;

  @OneToMany(
    (type) => AccessMembers,
    (accessmembers) => accessmembers.outterusers,
  )
  accessmembers: AccessMembers[];

  @ManyToMany((type) => OutterImages)
  @JoinTable()
  m_outterImages: OutterImages;

  // admin_id:number
}
