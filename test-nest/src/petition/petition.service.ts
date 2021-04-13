import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { petitionKind, petitionStage } from './dtos/petition.dto';
import { IBascicQuery } from './dtos/querystring';
import { Petitions } from './entities/petition.entity';

@Injectable()
export class PetitionService {
  constructor(
    @InjectRepository(Petitions)
    private petitionRepo: Repository<Petitions>,
  ) {}
  async getPetitionInfo({
    limit,
    offset,
    kind,
  }: {
    kind: typeof petitionKind[number];
  } & IBascicQuery) {
    return await this.petitionRepo.find({
      where: {
        kind,
      },
      skip: offset,
      take: limit,
    });
  }

  async updateStagePetitionInfo({ id }) {
    let petitionId: Petitions;
    let stageName;
    petitionId = await this.petitionRepo.findOne({ id });
    if (!petitionId) return { message: 'Not found pettionID' };
    const index = petitionStage.indexOf((petitionId as any).stage);
    if (petitionStage.length === index + 1) stageName = 'Accept request';
    else stageName = petitionStage[index + 1];
    petitionId.stage = stageName;
    return await this.petitionRepo.save(petitionId);
  }
}
