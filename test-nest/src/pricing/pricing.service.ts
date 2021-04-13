import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBascicQuery } from 'src/petition/dtos/querystring';
import { User } from 'src/user/entities/users.entity';
import { Repository } from 'typeorm';
import { PricingInfos } from './entities/pricing.entity';

@Injectable()
export class PricingService {
  constructor(
    @InjectRepository(PricingInfos)
    private pricingRepos: Repository<PricingInfos>,
    @InjectRepository(User)
    private userRepos: Repository<User>,
  ) {}

  async getPricingInfo({ offset, limit }: IBascicQuery) {
    return await this.pricingRepos.find({
      relations: ['user', 'group', 'groupbygroup'],
      join: {
        alias: 'pricingInfo',
        leftJoinAndSelect: {
          user: 'pricingInfo.user',
          group: 'pricingInfo.group',
          groupbygroup: 'pricingInfo.groupbygroup',
        },
      },
      skip: offset,
      take: limit,
    });
  }

  async getDetailPricingInfo(id) {
    const data = await this.pricingRepos.findOne({
      where: { id },
      relations: ['user'],
    });
    return await this.userRepos.findOne({
      where: { id: data.user.id },
      relations: ['group', 'groupbygroup'],
    });
  }
}
