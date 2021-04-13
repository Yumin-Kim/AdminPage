import { Controller, Get, Param, Query } from '@nestjs/common';
import { IBascicQuery } from 'src/petition/dtos/querystring';
import { PricingService } from './pricing.service';

@Controller('pricing')
export class PricingController {
  constructor(private pricingService: PricingService) {}

  @Get('')
  async getPricingInfo(@Query() sqlCount: IBascicQuery) {
    return await this.pricingService.getPricingInfo(sqlCount);
  }

  @Get('/detail/:id')
  async getDetailPricingInfo(@Param('id') id: number) {
    return await this.pricingService.getDetailPricingInfo(id);
  }
}
