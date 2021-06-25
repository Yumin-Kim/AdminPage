import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsedcarController } from './usedcar.controller';
import { UsedcarService } from './usedcar.service';
import { UsedCarInfos1, UsedCarInfos2 } from './entities/carinfo.entity';
import { UsedCarRepository } from './usedcar.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsedCarInfos1, UsedCarInfos2])],
  controllers: [UsedcarController],
  providers: [UsedcarService],
})
export class UsedcarModule {}
