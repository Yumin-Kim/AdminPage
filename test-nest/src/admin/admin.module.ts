import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admindashboards, Admins, Days } from './entities/admin.entity';
import {
  AccessMembers,
  Group,
  GroupByGroups,
  User,
} from 'src/user/entities/users.entity';
import { OutterImages, Images } from 'src/user/entities/image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { AuthService } from 'src/auth/auth.service';
import { OutterUsers } from 'src/user/entities/outter.entity';
import { ParkingInfos } from 'src/usercar/entities/usercar.entity';
import { VotingInfos } from 'src/voting/entities/voting.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forFeature([
      Admindashboards,
      Admins,
      Days,
      User,
      Images,
      OutterImages,
      OutterUsers,
      ParkingInfos,
      AccessMembers,
      VotingInfos,
      ParkingInfos,
      Admindashboards,
      Group,
      GroupByGroups,
    ]),
  ],
  exports: [AdminService],
  providers: [AdminService, AuthService],
  controllers: [AdminController],
})
export class AdminModule {}
