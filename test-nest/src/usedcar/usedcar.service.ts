import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsedCarInfos1, UsedCarInfos2 } from './entities/carinfo.entity';
import { Repository } from 'typeorm';
import { UsedCarRepository } from './usedcar2.repository';
import { UsedCarRepository2 } from './usedcar.repository';

@Injectable()
export class UsedcarService {
  constructor(
    @InjectRepository(UsedCarInfos1)
    private usedcarRepo: UsedCarRepository2,
    @InjectRepository(UsedCarInfos2)
    private usedcar2Repo: UsedCarRepository,
  ) {}

  async findUsedCarInfoService() {
    console.time('findAllEntityCount');
    const findAlltime = await this.usedcarRepo.count();
    console.timeEnd('findAllEntityCount');
    console.time('findAllEntityCount1');
    const findAllcu = await this.usedcar2Repo.count();
    console.timeEnd('findAllEntityCount1');
    console.time('findUseRequestName');
    const data = await Promise.all([
      this.usedcarRepo.find({
        where: { name: '재규어 F타입 3.0 쿠페 S' },
      }),
      this.usedcar2Repo.find({
        where: { name: '재규어 F타입 3.0 쿠페 S' },
      }),
    ]);
    console.timeEnd('findUseRequestName');
    console.time('no Promise.all and limit ,offest');
    const aa = await this.usedcarRepo.find({
      where: { name: '재규어 F타입 3.0 쿠페 S' },
      take: Math.floor(findAlltime / 2),
      skip: 0,
    });

    const bb = await this.usedcar2Repo.find({
      where: { name: '재규어 F타입 3.0 쿠페 S' },
      skip: Math.floor(findAlltime / 2),
      take: findAlltime,
    });
    console.timeEnd('no Promise.all and limit ,offest');
    return bb;
    // console.log(requestUserName1);
  }
}
