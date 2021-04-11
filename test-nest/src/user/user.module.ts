import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images, OutterImages } from './entities/image.entity';
import { OutterUsers } from './entities/outter.entity';
import { AccessMembers, Group, GroupByGroups, User } from './entities/users.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,GroupByGroups,Group,AccessMembers,OutterUsers,Images,OutterImages])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
