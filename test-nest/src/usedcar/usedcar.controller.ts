import { Controller, Get } from '@nestjs/common';
import { UsedcarService } from './usedcar.service';

@Controller('usedcar')
export class UsedcarController {
  constructor(private usedcarService: UsedcarService) {}

  @Get('/')
  async findUsedCarInfo() {
    console.log('findUsedCarInfo');

    return await this.usedcarService.findUsedCarInfoService();
  }
}
