import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBasicQuery } from 'src/user/dtos/querystring';
import { Group, User } from 'src/user/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateDashBoardDto, UpdateDashBoardDto } from './dtos/dashboard.dto';
import { Admindashboards, Admins } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    // @InjectRepository(Admins)
    // private adminRepository: Repository<Admins>,
    // @InjectRepository(Group)
    // private groupRepository: Repository<Group>,
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

  async createAdminInfo() {}

  async signupAdminInfo() {}

  async logoutAdminInfo() {}

  async registerInnerUser() {}

  async registerOutterUser() {}

  async getChartUserInfo() {}

  async getChartParkingInfo() {}

  async getChartExitUserInfo() {}

  async getChartTotalInfo() {}
}
