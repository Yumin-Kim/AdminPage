import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBasicQuery } from 'src/user/dtos/querystring';
import { Images, OutterImages } from 'src/user/entities/image.entity';
import { OutterUsers } from 'src/user/entities/outter.entity';
import { Group, User } from 'src/user/entities/users.entity';
import { Repository } from 'typeorm';
import {
  CreateDashBoardDto,
  LoginUserDto,
  RegisterInnerUser,
  RegisterOutterUser,
  SignUpUserDto,
  UpdateDashBoardDto,
} from './dtos/admin.dto';
import { Admindashboards, Admins, Days } from './entities/admin.entity';
import { ISignUpDayQuery } from './entities/querystring';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admins)
    private adminRepository: Repository<Admins>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Days)
    private dayRepository: Repository<Days>,
    @InjectRepository(Images)
    private imageRepository: Repository<Images>,
    @InjectRepository(OutterImages)
    private outterUserImageRespositoty: Repository<OutterImages>,
    @InjectRepository(OutterUsers)
    private outterUserRepository: Repository<OutterUsers>,
    @InjectRepository(Admindashboards)
    private adminDashBoardRepository: Repository<Admindashboards>, // @InjectRepository(User) // private userRepository: Repository<User>,
  ) {}
  async getDashBoardInfo(sqlCount: IBasicQuery): Promise<Admindashboards[]> {
    return await this.adminDashBoardRepository.find({
      relations: ['admin', 'group'],
      skip: sqlCount.offset,
      take: sqlCount.limit,
    });
  }

  async updateDashBoardInfo(
    updateDashboardDto: UpdateDashBoardDto,
  ): Promise<any> {
    const updateDashBoardIndex = await this.adminDashBoardRepository.findOne(
      updateDashboardDto.id,
    );
    Object.keys(updateDashBoardIndex).map((dashboard) => {
      updateDashBoardIndex[dashboard] = updateDashboardDto[dashboard];
    });
    await this.adminDashBoardRepository.save(updateDashBoardIndex);
    return await this.adminDashBoardRepository.findOne({
      where: { id: updateDashBoardIndex.id },
      relations: ['admin', 'group'],
    });
  }

  async deleteDashBoardInfo(offset, id): Promise<Admindashboards> {
    await this.adminDashBoardRepository.delete(id);
    return await this.adminDashBoardRepository.findOne({
      where: { id: offset },
      relations: ['admin', 'group'],
    });
  }

  async createDashBoardInfo(
    createDashBoardDto: CreateDashBoardDto,
  ): Promise<any> {
    const data = new Admindashboards();
    data.title = createDashBoardDto.title;
    data.description = createDashBoardDto.description;
    data.createdAt = createDashBoardDto.createdAt;
    data.updatedAt = createDashBoardDto.updatedAt;
    data.deletedAt = createDashBoardDto.deletedAt;
    data.admin = (createDashBoardDto.adminId as unknown) as Admins;
    data.group = (createDashBoardDto.adminId as unknown) as Group;

    await this.adminDashBoardRepository.save(data);
    return { message: 'Success' };
  }

  async signupAdminInfo(signUpUserDto: SignUpUserDto): Promise<any> {
    const { M_days } = signUpUserDto;
    const dayColumn = await this.dayRepository.findByIds(M_days);
    const adminTable = new Admins();
    Object.keys(signUpUserDto).map((member: keyof SignUpUserDto) => {
      if (member === 'email' || member === 'password' || member === 'name')
        adminTable[member] = signUpUserDto[member];
      if (member === 'group')
        adminTable[member] = (signUpUserDto[member] as unknown) as Group;
      if (member === 'M_days') adminTable[member] = dayColumn;
    });
    await this.adminRepository.save(adminTable);
    return { message: 'Success' };
  }

  //passport 사용하기
  //간편 로그인 기능 확장성 생각하기
  async loginAdminInfo(loginUserDto: LoginUserDto): Promise<Admins> {
    return await this.adminRepository.findOne({
      where: loginUserDto,
    });
  }

  async logoutAdminInfo() {}

  //이미지 저장
  async registerInnerUser(registerInnerUser: RegisterInnerUser): Promise<any> {
    console.log(registerInnerUser);

    const userTable = new User();
    const imagetable = new Images();

    imagetable.imageCount = 1;
    imagetable.name = registerInnerUser.name;
    imagetable.createdAt = registerInnerUser.createdAt;

    Object.keys(registerInnerUser).map((member: keyof RegisterInnerUser) => {
      (userTable[member] as
        | string
        | boolean
        | number
        | Date) = registerInnerUser[member];
    });

    const InsertImageReseult = await this.imageRepository.save(imagetable);
    userTable.M_images = [InsertImageReseult] as Images[];

    await this.userRepository.save(userTable);

    return { message: 'Success' };
  }

  async registerOutterUser(
    registerOutterUser: RegisterOutterUser,
  ): Promise<any> {
    const outterUserTable = new OutterUsers();
    const outterImageTable = new OutterImages();
    const filterUser = await this.userRepository.findOne({
      where: {
        name: registerOutterUser.username,
      },
    });
    if (!filterUser) return { message: '없는 회원을 입력!!' };

    Object.keys(registerOutterUser).map((member: keyof OutterUsers) => {
      if (member === ('username' as any)) return;
      (outterUserTable[member] as number | string | Date) = registerOutterUser[
        member
      ];
    });

    outterImageTable.imageCount = 1;
    outterImageTable.name = registerOutterUser.name;
    outterImageTable.createdAt = registerOutterUser.createdAt;

    const InsertImageReseult = await this.outterUserImageRespositoty.save(
      outterImageTable,
    );
    outterUserTable.m_outterImages = [InsertImageReseult] as any;

    await this.outterUserRepository.save(outterUserTable);

    return { message: '성공' };
  }

  async getChartUserInfo() {}

  async getChartParkingInfo() {}

  async getChartExitUserInfo() {}

  async getChartTotalInfo() {}

  async findOne(payload: any): Promise<Admins | undefined> {
    console.log('findOne');
    const { email } = payload;
    console.log(email);

    return await this.adminRepository.findOne({ where: { email } });
  }
}
