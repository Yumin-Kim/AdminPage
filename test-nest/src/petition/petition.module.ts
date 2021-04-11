import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Petitions } from './entities/petition.entity';
import { PetitionController } from './petition.controller';
import { PetitionService } from './petition.service';

@Module({
    imports:[TypeOrmModule.forFeature([Petitions])],
    controllers:[PetitionController],
    providers:[PetitionService]
})
export class PetitionModule {}
