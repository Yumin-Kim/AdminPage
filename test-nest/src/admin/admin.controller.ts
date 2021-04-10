import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IBasicQuery } from 'src/user/dtos/querystring';
import { AdminService } from './admin.service';
import { CreateDashBoardDto, UpdateDashBoardDto } from './dtos/dashboard.dto';
import { Admindashboards, Admins } from './entities/admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('/dashboard')
  async getDashBoardInfo(
    @Query() sqlCount: IBasicQuery,
  ): Promise<Admindashboards[]> {
    return await this.adminService.getDashBoardInfo(sqlCount);
  }

  @Patch('/dashboard')
  async updateDashBoardInfo(
    @Body() updateDashboardDto: UpdateDashBoardDto,
  ): Promise<Admindashboards> {
    return await this.adminService.updateDashBoardInfo(updateDashboardDto);
  }

  @Delete('/dashboard/:id')
  async deleteDashBoardInfo(
    @Query('offset') offset: number,
    @Param('id') id: number,
  ): Promise<Admindashboards> {
    return await this.adminService.deleteDashBoardInfo(offset, id);
  }

  @Post('/dashboard')
  async createDashBoardInfo(
    @Body() createDashBoardDto: CreateDashBoardDto,
  ): Promise<any> {
    return this.adminService.createDashBoardInfo(createDashBoardDto);
  }

  @Post('/login')
  async createAdminInfo() {}

  @Post('/signup')
  async signupAdminInfo() {}

  @Post('logout')
  async logoutAdminInfo() {}

  @Post('/registering/inner')
  async registerInnerUser() {}

  @Post('/registering/outter')
  async registerOutterUser() {}

  @Get('/chart/user')
  async getChartUserInfo() {}

  @Get('/chart/parking')
  async getChartParkingInfo() {}

  @Get('/chart/exituser')
  async getChartExitUserInfo() {}

  @Get('/chart/totalcount')
  async getChartTotalInfo() {}
}
