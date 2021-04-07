import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admindashboards, Admins, Days } from './entities/admin.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Admindashboards,Admins,Days])],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
