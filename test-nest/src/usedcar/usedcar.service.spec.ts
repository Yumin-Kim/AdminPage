import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UsedCarInfos1, UsedCarInfos2 } from './entities/carinfo.entity';
import { UsedcarController } from './usedcar.controller';
import { UsedcarService } from './usedcar.service';
import { Repository } from 'typeorm';
import { UsedCarRepository2 } from './usedcar.repository';
import { UsedCarRepository } from './usedcar2.repository';

describe('UsedcarService', () => {
  let service: UsedcarService;
  let userCarInfoRepo: Repository<UsedCarInfos1[]>;

  // 주입하는게 단계 , 테스트 하기전 실행
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsedcarService,
        {
          provide: getRepositoryToken(UsedCarInfos1),
          useClass: UsedCarRepository2,
        },
        {
          provide: getRepositoryToken(UsedCarInfos2),
          useClass: UsedCarRepository,
        },
      ],
    }).compile();

    service = module.get<UsedcarService>(UsedcarService);
    userCarInfoRepo = module.get<Repository<UsedCarInfos1[]>>(
      getRepositoryToken(UsedCarInfos1),
    );
  });
  // describe는 무슨뜻?? 테스트 묘사
  // it 실질적으로 테스트 진행
  it('findUsedCarInfoService', async () => {
    // console.log(service);
    const result = await service.findUsedCarInfoService();
  });
});
