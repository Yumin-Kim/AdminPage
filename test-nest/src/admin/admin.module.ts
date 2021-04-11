import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admindashboards, Admins, Days } from './entities/admin.entity';
import { User } from 'src/user/entities/users.entity';
import { OutterImages, Images } from 'src/user/entities/image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { OutterUsers } from 'src/user/entities/outter.entity';

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
    ]),
  ],
  exports: [AdminService],
  providers: [AdminService, AuthService],
  controllers: [AdminController],
})
export class AdminModule {}
