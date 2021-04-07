import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotingInfos } from './entities/voting.entity';
import { VotingController } from './voting.controller';
import { VotingService } from './voting.service';

@Module({
  imports:[TypeOrmModule.forFeature([VotingInfos])],
  controllers:[VotingController],
  providers: [VotingService],
})
export class VotingModule {}
