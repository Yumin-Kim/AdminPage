import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/users.entity';
import { VotingInfos } from './entities/voting.entity';
import { VotingController } from './voting.controller';
import { VotingService } from './voting.service';

@Module({
  imports: [TypeOrmModule.forFeature([VotingInfos, User])],
  controllers: [VotingController],
  providers: [VotingService],
})
export class VotingModule { }
