import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  IBasicQuery,
  IFilterHumanQuery,
  IFilterRoomQuert,
  MergeHumanQueryString,
  MergeRoomQueryString,
} from './dtos/querystring';
import { Group, GroupByGroups, User } from './entities/users.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //기본 정보 조회
  @Get()
  async getAll(@Query() data: IBasicQuery): Promise<User[]> {
    const { offset, limit } = data;
    return await this.userService.getAll(offset, limit);
  }

  //사람만 조회
  @Get('/filter/human')
  async getFiliterhuman(
    @Query() querystring: MergeHumanQueryString,
  ): Promise<User[]> {
    return await this.userService.getFiliterhuman(querystring);
  }

  //group , groupByGroup
  @Get('/filter/room/:detail')
  async getFilterRoom(
    @Query('offset')
    offset: number,
    @Query('limit')
    limit: number,
    @Query()
    queryString: MergeRoomQueryString & IBasicQuery,
    @Param('detail')
    datail: 'group' | 'groupByGroup',
  ): Promise<User[][]> {
    delete queryString.limit;
    delete queryString.offset;
    let sqlCount: IBasicQuery = {
      offset,
      limit,
    };
    return await this.userService.getFilterRoom(queryString, sqlCount, datail);
  }

  //human , group|groupByGroup
  @Get('/filter/info/human/:detail')
  async getFilterHumanAndTable(
    @Query('offset')
    offset: number,
    @Query('limit')
    limit: number,
    @Query()
    queryString: MergeRoomQueryString & MergeHumanQueryString,
    @Param('detail')
    detail: 'group' | 'groupByGroup',
  ): Promise<User[][]> {
    delete queryString.limit;
    delete queryString.offset;
    let sqlCount: IBasicQuery = {
      offset,
      limit,
    };

    return await this.userService.getFilterHumanAndTable(queryString,sqlCount,detail)
    
  }

  @Get('/filter/info/human/group/groupbygroup')
  async getFilterFull() {}
}
