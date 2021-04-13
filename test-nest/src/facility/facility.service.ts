import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBasicQuery } from 'src/user/dtos/querystring';
import { Repository } from 'typeorm';
import {
  FacilityInfos,
  FacilityRoomLists,
  FacilityToolLists,
} from './entities/facility.entity';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(FacilityInfos)
    private facilityinfoRepo: Repository<FacilityInfos>,
    @InjectRepository(FacilityToolLists)
    private facilityToolListsRepo: Repository<FacilityToolLists>,
    @InjectRepository(FacilityRoomLists)
    private facilityRoomListsRepo: Repository<FacilityRoomLists>,
  ) {}

  async getFacilityInfos({ offset, limit }: IBasicQuery) {
    console.log(offset, limit);

    const data = await this.facilityinfoRepo.find({
      relations: ['M_facilityroomlist', 'M_facilitytoollist'],
      skip: offset,
      take: limit,
    });
    return data;
  }

  async getFacilityToolInfos({ offset, limit }: IBasicQuery) {
    return await this.facilityToolListsRepo.find({
      skip: offset,
      take: limit,
    });
  }

  async getFailityRoom({ offset, limit }: IBasicQuery) {
    return await this.facilityRoomListsRepo.find({
      skip: offset,
      take: limit,
    });
  }
}
