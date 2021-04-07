import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricingInfos } from './entities/pricing.entity';
import { PricingController } from './pricing.controller';
import { PricingService } from './pricing.service';

@Module({
  imports:[TypeOrmModule.forFeature([PricingInfos,])],
  controllers: [PricingController],
  providers:[PricingService]
})
export class PricingModule {}
