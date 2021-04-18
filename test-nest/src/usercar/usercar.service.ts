import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBascicQuery } from 'src/petition/dtos/querystring';
import { Repository } from 'typeorm';
import { UserCarQueryDto } from './dtos/usercar.dto';
import { ParkingInfos, UserCarInfos } from './entities/usercar.entity';
import { User } from '../user/entities/users.entity';

@Injectable()
export class UsercarService {
  constructor(
    @InjectRepository(UserCarInfos)
    private userCarRepos: Repository<UserCarInfos>,
    @InjectRepository(ParkingInfos)
    private parkingInfoRepos: Repository<ParkingInfos>,
    @InjectRepository(User)
    private userRepos: Repository<User>,
  ) {}

  async getUserCarInfo({ offset, limit }: IBascicQuery) {
    return await this.userCarRepos.find({
      relations: ['user', 'group', 'groupbygroup'],
      skip: offset,
      take: limit,
    });
  }
  async getFilterUserCarInfo(usercarQuert: UserCarQueryDto) {
    const queryUserCardata = new UserCarQueryDto(usercarQuert);
    const parseUserCarData = queryUserCardata.filterGetObject(queryUserCardata);

    if (parseUserCarData.user) {
      const data = await this.userRepos.findOne({
        where: {
          name: parseUserCarData.user,
        },
      });
      delete parseUserCarData.user;
      return await this.userCarRepos.find({
        relations: ['group', 'groupbygroup', 'user'],
        where: { ...parseUserCarData, user: data.id },
      });
    } else {
      return await this.userCarRepos.find({
        relations: ['group', 'user', 'groupbygroup'],
        where: parseUserCarData,
      });
    }

    // (Object.keys(parseUserCarData) as Array<keyof typeof parseUserCarData>).map((filtermember) => {
    //   asyncPushArray.push()

    // });
  }
}
