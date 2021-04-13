import { Group, GroupByGroups, User } from 'src/user/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('votinginfos')
export class VotingInfos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;

  @Column({ type: 'int' })
  agreementCount: number;

  @Column({ type: 'int' })
  oppositionCount: number;

  @ManyToOne((type) => User, (user) => user.votingInfos)
  user: User;

  @ManyToOne((type) => Group, (group) => group.votingInfos)
  group: Group;

  @ManyToOne(
    (type) => GroupByGroups,
    (groupbygroup) => groupbygroup.votingInfos,
  )
  groupbygroup: number;
}
