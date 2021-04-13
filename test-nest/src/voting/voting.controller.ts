import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IBasicQuery } from 'src/user/dtos/querystring';
import { IRegisterVotingInfoDto } from './dtos/voting.dto';
import { VotingService } from './voting.service';

@Controller('voting')
export class VotingController {

    constructor(
        private readonly votingInfoService: VotingService
    ) {
    }

    @Get("")
    async getVotingInfo(@Query() sqlCount: IBasicQuery) {
        return await this.votingInfoService.getVotingInfo(sqlCount)
    }

    @Post("")
    async registerVotingInfo(
        @Body() registerVotingInfoDto: IRegisterVotingInfoDto,
    ) {
        return await this.votingInfoService.registerVotingInfo(registerVotingInfoDto)
    }

    @Get("/progress")
    async getProgressVotingInfo() {

    }

    @Get("/deadline")
    async getdeadlineVotingInfo() {

    }



}
