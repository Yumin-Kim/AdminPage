import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { petitionKind, petitionStage } from './dtos/petition.dto';
import { IBascicQuery } from './dtos/querystring';
import { PetitionService } from './petition.service';

@Controller('petition')
export class PetitionController {
  constructor(private petitionService: PetitionService) {}

  @Get('')
  async getPetitionInfo(
    @Query() sqlCount: IBascicQuery,
    @Query('kind') kind: typeof petitionKind[number],
  ) {
    return await this.petitionService.getPetitionInfo({ ...sqlCount, kind });
  }

  @Patch('/update/:id')
  async updateStagePetitionInfo(
    @Param('id') id: number,
    //   @Query("stage") stage : typeof petitionStage[number]
  ) {
    return await this.petitionService.updateStagePetitionInfo({ id });
  }
}
