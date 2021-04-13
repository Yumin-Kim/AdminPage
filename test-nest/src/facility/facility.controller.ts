import { Controller, Get, Query } from '@nestjs/common';
import { IBasicQuery } from 'src/user/dtos/querystring';
import { FacilityService } from './facility.service';

@Controller('facility')
export class FacilityController {
  constructor(private facilityService: FacilityService) {}

  @Get('')
  async getFacilityInfos(@Query() sqlcount: IBasicQuery) {
    return await this.facilityService.getFacilityInfos(sqlcount);
  }

  @Get('/toollist')
  async getFacilityToolInfos(@Query() sqlCount: IBasicQuery) {
    return await this.facilityService.getFacilityToolInfos(sqlCount);
  }

  @Get('/roomlist')
  async getFailityRoom(@Query() sqlCount: IBasicQuery) {
    return await this.facilityService.getFailityRoom(sqlCount);
  }
}
