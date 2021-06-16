import { Repository } from 'typeorm';
import { UsedCarInfos1 } from './entities/carinfo.entity';
export class UsedCarRepository extends Repository<UsedCarInfos1[]> {}
