import { EntityRepository, Repository } from 'typeorm';
import { UsedCarInfos2, UsedCarInfos1 } from './entities/carinfo.entity';
@EntityRepository(UsedCarInfos2)
@EntityRepository(UsedCarInfos1)
export class UsedCarRepository extends Repository<UsedCarInfos2[]> {}
