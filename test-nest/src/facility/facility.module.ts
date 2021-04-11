import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityInfos, FacilityRoomLists, FacilityToolLists } from './entities/facility.entity';
import { FacilityController } from './facility.controller';
import { FacilityService } from './facility.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([FacilityInfos,FacilityToolLists,FacilityRoomLists,])
  ],
  controllers: [FacilityController],
  providers: [FacilityService]
})
export class FacilityModule {}
