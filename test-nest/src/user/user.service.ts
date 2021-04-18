import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { FindOperator, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import {
  filterGroup_GroupByObject,
  IBasicQuery,
  IFilterFullTable,
  IFilterGroupBy,
  IFilterHumanQuery,
  IFilterRoomQuert,
  MergeHumanQueryString,
  MergeRoomQueryString,
  parseQueryString,
} from './dtos/querystring';
import { UpdateUserDto } from './dtos/update-user.dto';
import { OutterUsers } from './entities/outter.entity';
import { Group, GroupByGroups, User } from './entities/users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(GroupByGroups)
    private groupByGroupRepository: Repository<GroupByGroups>, // @InjectEntityManager(User) // private entityManager
    @InjectRepository(OutterUsers)
    private outterUserRepository: Repository<OutterUsers>,
  ) {
    // const userTableColumn =  ['host', 'memberIndex', 'phoneNumber']
  }

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

  getFiliterhuman(
    { host, memberIndex, phoneNumber }: Record<keyof IFilterHumanQuery, string>,
    { offset, limit }: IBasicQuery,
  ): Promise<any> {
    let mergeQuerystringObject: IFilterHumanQuery = {};
    if (host) mergeQuerystringObject.host = host === 'true' ? true : false;
    if (memberIndex) mergeQuerystringObject.memberIndex = Number(memberIndex);
    if (phoneNumber) mergeQuerystringObject.phoneNumber = phoneNumber;
    return this.userRepository.find({
      relations: ['group', 'groupbygroup'],
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
        data.pricing = (LessThan(queryString.pricing) as unknown) as number;
      if (queryString['name'])
        data.name = (LessThan(queryString.name) as unknown) as number;
      if (queryString['roomCount'])
        data.roomCount = Number(queryString.roomCount);

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
      interface FilterGroupBy {
        name?: FindOperator<number>;
        repairCount?: number;
        pricing?: FindOperator<number>;
      }
      let data: FilterGroupBy = {};
      if (queryString['pricing']) data.pricing = LessThan(queryString.pricing);
      if (queryString['name']) data.name = LessThan(Number(queryString.name));
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
  ): Promise<User[][]> {
    const parseUserQuery = parseQueryString(
      queryString,
      ['host', 'memberIndex', 'phoneNumber'],
      {} as IFilterHumanQuery,
    );

    if (detail === 'group') {
      const parseGroupQuery = parseQueryString(
        queryString,
        ['maxWeight', 'minWeight', 'pricing', 'name', 'roomCount'],
        {} as IFilterRoomQuert,
      );
      const ReternfilterGroupColumn = filterGroup_GroupByObject<IFilterRoomQuert>(
        parseGroupQuery,
        ['maxWeight', 'minWeight', 'pricing', 'name', 'roomCount'],
      );

      const groupData = await this.groupRepository.find(
        ReternfilterGroupColumn,
      );

      return await Promise.all(
        groupData.map((value, index) => {
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
      const parseGroupByGroup = parseQueryString(
        queryString,
        ['name', 'repairCount', 'pricing'],
        {} as IFilterGroupBy,
      );

      const ReternfilterGroupByGroupColumn = filterGroup_GroupByObject(
        parseGroupByGroup,
        ['name', 'repairCount', 'pricing'],
      );

      const groupByGroupData = await this.groupByGroupRepository.find(
        ReternfilterGroupByGroupColumn,
      );

      return await Promise.all(
        groupByGroupData.map((groupByGroup) => {
          return this.userRepository.find({
            where: { ...parseUserQuery, groupbygroup: groupByGroup.id },
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

  async getFilterFull(
    queryString: IFilterFullTable,
    sqlCount: IBasicQuery,
  ): Promise<any> {
    console.log(queryString);

    const parseQueryUserColumn = parseQueryString(
      queryString as IFilterHumanQuery,
      ['host', 'memberIndex', 'phoneNumber'],
      {} as IFilterHumanQuery,
    );
    console.log(parseQueryUserColumn);
    const parseQueryGroupColumn = parseQueryString(
      queryString,
      ['maxWeight', 'minWeight', 'pricing', 'name', 'roomCount'],
      {} as IFilterRoomQuert,
    );

    const parseQueryGroupByGroupColumn = parseQueryString<
      IFilterFullTable,
      IFilterFullTable
    >(
      queryString,
      ['c_name', 'repairCount', 'c_pricing'],
      {} as IFilterGroupBy,
    );

    Object.keys(parseQueryGroupByGroupColumn).map(
      (value: keyof IFilterFullTable) => {
        if (value.split('_').length > 1) {
          parseQueryGroupByGroupColumn[value.split('_')[1]] =
            parseQueryGroupByGroupColumn[value];
          delete parseQueryGroupByGroupColumn[value];
        }
      },
    );

    const ReturnfilterGroupColumn = filterGroup_GroupByObject<IFilterRoomQuert>(
      parseQueryGroupColumn,
      ['maxWeight', 'minWeight', 'pricing', 'name', 'roomCount'],
    );

    const ReturnfilterGroupByGroupColumn = filterGroup_GroupByObject<IFilterGroupBy>(
      parseQueryGroupByGroupColumn,
      ['name', 'repairCount', 'pricing'],
    );

    let joinResultTableIds: GroupByGroups[][] = [];
    const FilterGroupResult = await this.groupRepository.find(
      ReturnfilterGroupColumn,
    );

    const FilterGroupByResult = await this.groupByGroupRepository.find(
      ReturnfilterGroupByGroupColumn,
    );

    let asyncPush = [];
    FilterGroupResult.map((groupResult) => {
      FilterGroupByResult.map((groupByResult) => {
        asyncPush.push(
          this.userRepository.find({
            where: {
              ...parseQueryUserColumn,
              group: groupResult.id,
              groupbygroup: groupByResult.id,
            },
            relations: ['group', 'groupbygroup'],
            skip: sqlCount.offset,
            take: sqlCount.limit,
          }),
        );
      });
    });
    const resultData = await Promise.all(asyncPush);
    resultData.map((element) => {
      if (joinResultTableIds.length > 21) return;
      if (element.length > 0) {
        joinResultTableIds.push(element);
      }
    });
    return joinResultTableIds;
  }

  async updateUserInfo(id: number, updateUser: UpdateUserDto): Promise<User> {
    const data = await this.userRepository.findOne(id);
    Object.keys(updateUser).map((value) => {
      data[value] = updateUser[value];
    });
    await this.userRepository.save(data);
    return await this.userRepository.findOne({
      where: { id: data.id },
      relations: ['group', 'groupbygroup'],
    });
  }

  async deleteUserInfo({ id, offset }) {
    await this.userRepository.delete(id);
    return await this.userRepository.findOne({
      where: { id: offset },
      relations: ['group', 'groupbygroup'],
    });
  }

  async getOutterUser({ offset, limit }) {
    return await this.outterUserRepository.find({
      relations: ['user', 'group', 'groupbygroup'],
    });
  }
}
