import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBasicQuery } from 'src/user/dtos/querystring';
import { Images, OutterImages } from 'src/user/entities/image.entity';
import { OutterUsers } from 'src/user/entities/outter.entity';
import {
  AccessMembers,
  Group,
  GroupByGroups,
  User,
} from 'src/user/entities/users.entity';
import { ParkingInfos } from 'src/usercar/entities/usercar.entity';
import { VotingInfos } from 'src/voting/entities/voting.entity';
import {
  Between,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import {
  CreateDashBoardDto,
  LoginUserDto,
  RegisterInnerUser,
  RegisterOutterUser,
  SignUpUserDto,
  UpdateDashBoardDto,
} from './dtos/admin.dto';
import { Admindashboards, Admins, Days } from './entities/admin.entity';
import {
  DateChart,
  ISignUpDayQuery,
  ResultChartUser,
  TotalTableClass,
  UserTableChart,
  U_TotalTable,
} from './entities/querystring';

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
    @InjectRepository(Group)
    private GroupRepository: Repository<Group>,
    @InjectRepository(GroupByGroups)
    private groupByGroupRepository: Repository<GroupByGroups>,
    @InjectRepository(OutterImages)
    private outterUserImageRespositoty: Repository<OutterImages>,
    @InjectRepository(OutterUsers)
    private outterUserRepository: Repository<OutterUsers>,
    @InjectRepository(Admindashboards)
    private adminDashBoardRepository: Repository<Admindashboards>, // @InjectRepository(User) // private userRepository: Repository<User>,
    @InjectRepository(ParkingInfos)
    private parkingInfoRepository: Repository<ParkingInfos>,
    @InjectRepository(AccessMembers)
    private accessMembersRepository: Repository<AccessMembers>,
    @InjectRepository(VotingInfos)
    private votingInfosRepository: Repository<VotingInfos>,
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
    data.group = (createDashBoardDto.groupId as unknown) as Group;

    const saveAdminDashBoard = await this.adminDashBoardRepository.save(data);
    return await this.adminDashBoardRepository.findOne({
      where: {
        id: saveAdminDashBoard.id,
      },
      relations: ['admin', 'group'],
    });
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
    const data = await this.adminRepository.findOne({
      where: loginUserDto,
      relations: ['group', 'M_days'],
    });
    return data;
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

    return { message: 'success' };
  }

  async getChartUserInfo(sqlCount: IBasicQuery) {
    //host 수 / memberIndex  수별로  /
    const { offset, limit } = sqlCount;
    const asyncPushTask: Promise<User[]>[] = [];
    Array(limit - offset)
      .fill(offset)
      .map((member, index) => {
        console.log(member, index);
        asyncPushTask.push(
          this.userRepository.find({
            where: {
              group:
                MoreThanOrEqual((member + index) * 10) &&
                LessThanOrEqual((member + (index + 1)) * 10),
            },
            relations: ['group'],
          }),
        );
      });
    const filterUserTableRow = await Promise.all(asyncPushTask);
    const resultCharUserArray: ResultChartUser[] = [];
    filterUserTableRow.map((params, index) => {
      resultCharUserArray[`${(offset + index) * 10}`] = params.length;
    });
    const arrayData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const mergeObject = filterUserTableRow.reduce(
      (prev, current: User[], index, array): any => {
        let minTemp = 0;
        let maxTemp = 0;
        let MergeChartInfo = {} as ResultChartUser;
        let userTableObj = {} as UserTableChart;
        let userHostObj = { true: 0, false: 0 };
        let memberIndex = {} as {
          [key in '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9']: number;
        };

        current.map((memberVariale) => {
          if (minTemp === 0) minTemp = memberVariale.group.id;
          if (maxTemp === 0) maxTemp = memberVariale.group.id;
          (minTemp as number) =
            memberVariale.group.id > minTemp ? minTemp : memberVariale.group.id;
          (maxTemp as number) =
            memberVariale.group.id > maxTemp ? memberVariale.group.id : maxTemp;
          memberVariale['host'] === true
            ? userHostObj.true++
            : userHostObj.false++;
          arrayData.map((value) => {
            if (memberVariale.memberIndex === Number(value)) {
              isNaN(memberIndex[value])
                ? (memberIndex[value] = 1)
                : memberIndex[value]++;
            }
          });
        });

        userTableObj.host = userHostObj;
        userTableObj.memberIndex = memberIndex;

        MergeChartInfo.maxGroupId = maxTemp;
        MergeChartInfo.minGroupId = minTemp;
        MergeChartInfo.userTable = userTableObj;
        MergeChartInfo.totalCount = current.length;

        prev.push(MergeChartInfo);
        return prev;
      },
      [] as ResultChartUser[],
    );
    return mergeObject;
  }

  /// 수정 요함
  async getChartParkingInfo(
    startPoint: number,
    endPoint: number,
    sqlCount: IBasicQuery,
  ): Promise<any> {
    const asyncPushTask = [];
    Array(endPoint - startPoint + 1)
      .fill(0)
      .map((member, index) => {
        asyncPushTask.push(
          this.parkingInfoRepository.find({
            relations: ['group', 'user'],
            where: {
              group: Number(startPoint) + index,
            },
          }),
        );
      });
    const data = await Promise.all(asyncPushTask);

    return data;
  }

  //프론트에서 년 월 갯수 전달하는 방식으로 구현
  async getChartExitUserInfo(datechart: DateChart) {
    const { year, count, date } = datechart;
    let Year = Number(year);
    let Count = Number(count);
    let Date = Number(date);
    const data = await Promise.all(
      Array(Count)
        .fill(null)
        .map((params, index) => {
          const data = this.accessMembersRepository.find({
            admisssionTime: Between(
              `${Year}-${Date}-01`,
              `${Date + 1 === 13 ? ++Year : Year}-${String(
                Date + 1 === 13 ? (Date = 1) : ++Date,
              )}-01`,
            ),
          });
          return data;
        }),
    );
    interface IData {
      id: number;
      admisssionTime: Date;
    }
    const pushData = [];
    ((data as unknown) as IData[][]).map<IData[]>((member): any => {
      const object = {} as any;
      object['admisssionTime'] = member[0].admisssionTime;
      object['length'] = member.length;
      pushData.push(object);
    });
x
    return pushData;
  }

  async getChartTotalInfo(totalTableClass: Partial<TotalTableClass>) {
    const requireResultTable = {} as Partial<TotalTableClass>;
    const asyncTask = [];
    const asyncTaskMappingName = [];
    Object.keys(totalTableClass).map((value, index) => {
      requireResultTable[value] = Boolean(totalTableClass[value]);
    });
    Object.keys(requireResultTable).map(
      (member: keyof Partial<TotalTableClass>) => {
        if (member === 'admin') {
          asyncTask.push(this.adminRepository.find());
          asyncTaskMappingName.push('admin');
        }
        if (member === 'group') {
          asyncTask.push(this.GroupRepository.find());
          asyncTaskMappingName.push('group');
        }
        if (member === 'groupbygroup') {
          asyncTask.push(this.groupByGroupRepository.find());
          asyncTaskMappingName.push('groupbygroup');
        }
        if (member === 'image') {
          asyncTask.push(this.imageRepository.find());
          asyncTaskMappingName.push('image');
        }
        if (member === 'imageoutter') {
          asyncTask.push(this.outterUserImageRespositoty.find());
          asyncTaskMappingName.push('imageoutter');
        }
        if (member === 'outter') {
          asyncTask.push(this.outterUserRepository.find());
          asyncTaskMappingName.push('outter');
        }
        if (member === 'parkingInfo') {
          asyncTask.push(this.parkingInfoRepository.find());
          asyncTaskMappingName.push('parkingInfo');
        }
        if (member === 'user') {
          asyncTask.push(this.userRepository.find());
          asyncTaskMappingName.push('user');
        }
        if (member === 'votingInfo') {
          asyncTask.push(this.votingInfosRepository.find());
          asyncTaskMappingName.push('votingInfo');
        }
      },
    );
    const asyncReturn = await Promise.all(asyncTask);
    const resultData = {} as Record<U_TotalTable, number>;
    asyncReturn.map((member, index) => {
      resultData[asyncTaskMappingName[index]] = member.length;
    });
    return resultData;
  }

  async findOne(payload: any): Promise<Admins | undefined> {
    const { email } = payload;
    return await this.adminRepository.findOne({
      where: { email },
      relations: ['group', 'M_days'],
    });
  }
}
