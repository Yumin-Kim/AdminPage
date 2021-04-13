import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/users.entity';
import { PricingInfos } from './entities/pricing.entity';
import { PricingController } from './pricing.controller';
import { PricingService } from './pricing.service';

@Module({
  imports: [TypeOrmModule.forFeature([PricingInfos, User])],
  controllers: [PricingController],
  providers: [PricingService],
})
export class PricingModule {}
