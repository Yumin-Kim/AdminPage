import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admindashboards, Admins, Days } from './entities/admin.entity';
import { AccessMembers, User } from 'src/user/entities/users.entity';
import { OutterImages, Images } from 'src/user/entities/image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { OutterUsers } from 'src/user/entities/outter.entity';
import { ParkingInfos } from 'src/usercar/entities/usercar.entity';

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
      AccessMembers
    ]),
  ],
  exports: [AdminService],
  providers: [AdminService, AuthService],
  controllers: [AdminController],
})
export class AdminModule { }
