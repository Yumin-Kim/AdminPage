import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IBasicQuery } from 'src/user/dtos/querystring';
import { IRegisterVotingInfoDto } from './dtos/voting.dto';
import { VotingService } from './voting.service';
import { T_dateInfo } from './dtos/querystring';

@Controller('voting')
export class VotingController {
  constructor(private readonly votingInfoService: VotingService) {}

  @Get('')
  async getVotingInfo(@Query() sqlCount: IBasicQuery) {
    return await this.votingInfoService.getVotingInfo(sqlCount);
  }

  @Post('')
  async registerVotingInfo(
    @Body() registerVotingInfoDto: IRegisterVotingInfoDto,
  ) {
    return await this.votingInfoService.registerVotingInfo(
      registerVotingInfoDto,
    );
  }

  @Get('/progress')
  async getProgressVotingInfo(@Query() sqlCount: IBasicQuery) {
    return await this.votingInfoService.getProgressVotingInfo(sqlCount);
  }

  //종료 일자 year , date 입력후 보여주기 next (year date)
  @Get('/deadline')
  async getdeadlineVotingInfo(@Query() dateInfo: T_dateInfo) {
    return await this.votingInfoService.getdeadlineVotingInfo(dateInfo);
  }
}
