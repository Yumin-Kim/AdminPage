import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBasicQuery } from 'src/user/dtos/querystring';
import { Group, User } from 'src/user/entities/users.entity';
import { Between, MoreThan, Repository } from 'typeorm';
import { T_dateInfo } from './dtos/querystring';
import { IRegisterVotingInfoDto } from './dtos/voting.dto';
import { VotingInfos } from './entities/voting.entity';

@Injectable()
export class VotingService {
  constructor(
    @InjectRepository(VotingInfos)
    private votingInfoRepository: Repository<VotingInfos>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getVotingInfo({ offset, limit }: IBasicQuery) {
    console.log(offset, limit);
    return await this.votingInfoRepository.find({
      relations: ['user', 'group', 'groupbygroup'],
      skip: offset,
      take: limit,
    });
  }

  async registerVotingInfo({
    name,
    title,
    description,
    createdAt,
  }: IRegisterVotingInfoDto) {
    let findUserId: User;
    const data = [title, description, createdAt];
    if (typeof name === 'string') {
      findUserId = await this.userRepository.findOne({
        relations: ['group', 'groupbygroup'],
        where: { name },
      });
    }
    if (!findUserId) return { message: 'Not found user name' };
    const votingInfo = new VotingInfos();
    ['title', 'description', 'createdAt'].map(
      (member: keyof IRegisterVotingInfoDto, index) => {
        votingInfo[member] = data[index];
      },
    );
    votingInfo.agreementCount = 0;
    votingInfo.oppositionCount = 0;
    votingInfo.group = (findUserId.group.id as unknown) as Group;
    votingInfo.groupbygroup = findUserId.groupbygroup.id;
    votingInfo.user = (findUserId.id as unknown) as User;
    return await this.votingInfoRepository.save(votingInfo);
  }
  async getProgressVotingInfo({ offset, limit }: IBasicQuery) {
    return await this.votingInfoRepository.find({
      relations: ['user', 'group', 'groupbygroup'],
      where: {
        createdAt: MoreThan(`2021-${new Date().getUTCMonth() - 2}-01`),
      },
      take: limit,
    });
  }
  async getdeadlineVotingInfo({ year, date, nextdate, nextyear }: T_dateInfo) {
    return await this.votingInfoRepository.find({
      relations: ['user', 'group', 'groupbygroup'],
      where: {
        deletedAt: Between(`${year}-${date}-01`, `${nextyear}-${nextdate}-01`),
      },
      take: 20,
    });
  }
}
