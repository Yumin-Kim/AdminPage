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
  IFilterFullTable,
  IFilterHumanQuery,
  IFilterRoomQuert,
  MergeHumanQueryString,
  MergeRoomQueryString,
} from './dtos/querystring';
import { UpdateUserDto } from './dtos/update-user.dto';
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
    @Query() querystring: Record<keyof IFilterHumanQuery, string>,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<User[]> {
    return await this.userService.getFiliterhuman(querystring, {
      offset,
      limit,
    });
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

    return await this.userService.getFilterHumanAndTable(
      queryString,
      sqlCount,
      detail,
    );
  }

  @Get('/filter/info/human/group/groupbygroup')
  async getFilterFull(
    @Query('offset')
    offset: number,
    @Query('limit')
    limit: number,
    @Query()
    queryString: IFilterFullTable,
  ) {
    delete queryString.limit;
    delete queryString.offset;
    let sqlCount: IBasicQuery = {
      offset,
      limit,
    };
    return await this.userService.getFilterFull(queryString, sqlCount);
  }

  @Patch('/changed/:id')
  async updateUserInfo(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUserInfo(id, updateUserDto);
  }

  @Delete('/deleted')
  async deleteUserInfo(
    @Query('id') id: number,
    @Query('offset') offset: number,
  ) {
    return await this.userService.deleteUserInfo({ id, offset });
  }

  @Get('/outter')
  async getOutterUser(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    return await this.userService.getOutterUser({ offset, limit });
  }
}
