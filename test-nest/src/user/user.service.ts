import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import {
  IBasicQuery,
  IFilterGroupBy,
  IFilterHumanQuery,
  IFilterRoomQuert,
  MergeHumanQueryString,
  MergeRoomQueryString,
  parseQueryString,
} from './dtos/querystring';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Group, GroupByGroups, User } from './entities/users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(GroupByGroups)
    private groupByGroupRepository: Repository<GroupByGroups>,
  ) {}

  getAll(offset: number, limit: number): Promise<User[]> {
    return this.userRepository.find({
      relations: ['groupbygroup', 'group'],
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          groupbygroup: 'user.groupbygroup',
          group: 'user.group',
        },
      },
      skip: offset,
      take: limit,
    });
  }

  getFiliterhuman({
    offset,
    limit,
    host,
    memberIndex,
    phoneNumber,
  }: MergeHumanQueryString): Promise<User[]> {
    //where OR
    // let valid=[];
    // if(host) valid.push({host});
    // if(memberIndex) valid.push({memberIndex});
    // if(phoneNumber) valid.push({phoneNumber});
    // console.log(valid.map(v=>v));

    let mergeQuerystringObject: IFilterHumanQuery = {};
    if (host) mergeQuerystringObject.host = host;
    if (memberIndex) mergeQuerystringObject.memberIndex = memberIndex;
    if (phoneNumber) mergeQuerystringObject.phoneNumber = phoneNumber;

    return this.userRepository.find({
      where: mergeQuerystringObject,
      skip: offset,
      take: limit,
    });
  }
  async getFilterRoom(
    queryString: MergeRoomQueryString,
    sqlCount: IBasicQuery,
    detailtable: 'group' | 'groupByGroup',
  ): Promise<User[][]> {
    if (detailtable === 'group') {
      let data: IFilterRoomQuert = {};

      if (queryString['maxWeight'])
        data.maxWeight = (LessThan(queryString.maxWeight) as unknown) as number;
      if (queryString['minWeight'])
        data.minWeight = (MoreThan(queryString.minWeight) as unknown) as number;
      if (queryString['pricing'])
        data.name = (LessThan(queryString.name) as unknown) as number;
      if (queryString['name']) data.name = queryString.name;
      if (queryString['roomCount']) data.roomCount = queryString.roomCount;

      const groupData = await this.groupRepository.find(data);
      return await Promise.all(
        groupData.map((value, index) => {
          return this.userRepository.find({
            where: {
              group: value.id,
            },
            relations: ['groupbygroup', 'group'],
            join: {
              alias: 'user',
              leftJoinAndSelect: {
                groupbygroup: 'user.groupbygroup',
                group: 'user.group',
              },
            },
            skip: sqlCount.offset,
            take: sqlCount.limit,
          });
        }),
      );
    } else {
      let data: IFilterGroupBy = {};

      if (queryString['pricing'])
        data.pricing = (LessThan(queryString.pricing) as unknown) as number;
      if (queryString['name']) data.name = queryString.name;
      if (queryString['repairCount'])
        data.repairCount = queryString.repairCount;

      const groupByData = await this.groupByGroupRepository.find(data);

      return await Promise.all(
        groupByData.map((value, index) => {
          return this.userRepository.find({
            where: {
              groupbygroup: value.id,
            },
            relations: ['groupbygroup', 'group'],
            join: {
              alias: 'user',
              leftJoinAndSelect: {
                groupbygroup: 'user.groupbygroup',
                group: 'user.group',
              },
            },
            skip: sqlCount.offset,
            take: sqlCount.limit,
          });
        }),
      );
    }
  }

  async getFilterHumanAndTable(
    queryString: MergeRoomQueryString & IFilterHumanQuery,
    sqlCount: IBasicQuery,
    detail: 'group' | 'groupByGroup',
  ): Promise<any> {
    const parseUserQuery = parseQueryString(
      queryString,
      ['host', 'memberIndex', 'phoneNumber'],
      {},
    );

    if (detail === 'group') {
      const parseGroupQuery = parseQueryString(
        queryString,
        ['maxWeight', 'minWeight', 'pricing', 'name', 'roomCount'],
        {},
      );
      console.log(parseGroupQuery);
      const groupData = await this.groupRepository.find(parseGroupQuery);
      return await Promise.all(
        await groupData.map((value, index) => {
          // if (index === sqlCount.limit) return;
          return this.userRepository.find({
            where: { ...parseUserQuery, group: value.id },
            relations: ['groupbygroup', 'group'],
            join: {
              alias: 'user',
              leftJoinAndSelect: {
                groupbygroup: 'user.groupbygroup',
                group: 'user.group',
              },
            },
            skip: sqlCount.offset,
            take: sqlCount.limit,
          });
        }),
      );
    } else {
    }
  }
}
