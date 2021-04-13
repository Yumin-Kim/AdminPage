import { Controller, Get, Query } from '@nestjs/common';
import { IBascicQuery } from 'src/petition/dtos/querystring';
import { UsercarService } from './usercar.service';
import { userCarQuery, UserCarQueryDto } from './dtos/usercar.dto';

@Controller('usercar')
export class UsercarController {
  constructor(private usercarService: UsercarService) {}

  @Get('')
  async getUserCarInfo(@Query() sqlCount: IBascicQuery) {
    return await this.usercarService.getUserCarInfo(sqlCount);
  }

  @Get('/filter')
  async getFilterUserCarInfo(@Query() userCarQuery: UserCarQueryDto) {
    return await this.usercarService.getFilterUserCarInfo(userCarQuery);
  }
}
