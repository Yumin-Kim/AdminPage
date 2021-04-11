import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingInfos, UserCarInfos } from './entities/usercar.entity';
import { UsercarController } from './usercar.controller';
import { UsercarService } from './usercar.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserCarInfos,ParkingInfos])],
  controllers: [UsercarController],
  providers: [UsercarService]
})
export class UsercarModule {}
