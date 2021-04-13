import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBasicQuery } from 'src/user/dtos/querystring';
import { User } from 'src/user/entities/users.entity';
import { Repository } from 'typeorm';
import { IRegisterVotingInfoDto } from './dtos/voting.dto';
import { VotingInfos } from './entities/voting.entity';

@Injectable()
export class VotingService {
    constructor(
        @InjectRepository(VotingInfos)
        private votingInfoRepository: Repository<VotingInfos>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async getVotingInfo({ offset, limit }: IBasicQuery) {
        console.log(offset, limit);
        return await this.votingInfoRepository.find({
            relations: ["user", "group", "groupbygroup"],
            skip: offset,
            take: limit
        })
    }

    async registerVotingInfo({ name, title, description, createdAt }: IRegisterVotingInfoDto) {
        let findUserId: User;
        if (typeof name === "string") {
            findUserId = await this.userRepository.findOne({ name })
        }
        if (!findUserId) return { message: "Not found user name" }
        // const votingInfo = new 
    }
    async getProgressVotingInfo() {
    }
    async getdeadlineVotingInfo() {

    }

}
