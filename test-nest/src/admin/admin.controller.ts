import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthService } from 'src/auth/auth.service';
import { IBasicQuery } from 'src/user/dtos/querystring';
import { AdminService } from './admin.service';
import {
  CreateDashBoardDto,
  LoginUserDto,
  RegisterInnerUser,
  RegisterOutterUser,
  SignUpUserDto,
  UpdateDashBoardDto,
} from './dtos/admin.dto';
import { Admindashboards, Admins } from './entities/admin.entity';
import { ISignUpDayQuery } from './entities/querystring';
import { editFileName, imageFileFilter } from './middleware/image-upload';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private authService: AuthService,
  ) { }
  @UseGuards(AuthGuard('jwt'))
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
  @Post('/signup')
  async signupAdminInfo(
    @Body() signUpUserDto: SignUpUserDto,
  ): Promise<SignUpUserDto> {
    return this.adminService.signupAdminInfo(signUpUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/jwt/login')
  async loginJWT(): Promise<any> {
    return { auth: 'works' };
  }

  @Post('/login')
  async loginAdminInfo(@Body() loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.adminService.loginAdminInfo(loginUserDto);
    console.log(user);

    const payload = {
      username: user.name,
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('logout')
  async logoutAdminInfo() { }

  @Post('/registering/inner')
  async registerInnerUser(
    @Body() registerInnerUser: RegisterInnerUser,
  ): Promise<any> {
    return await this.adminService.registerInnerUser(registerInnerUser);
  }

  @Post('/registering/outter')
  async registerOutterUser(
    @Body() registerOutterUser: RegisterOutterUser,
  ): Promise<any> {
    return this.adminService.registerOutterUser(registerOutterUser);
  }

  ///////////////////////////////////
  //single Inner Image Upload
  @Post('/registering/inner/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      //이미지 명은 passport를 활용하여 사용자 정보를 받은후 사용자의 id or 이미지 id를 활용하여 파일 명 변경
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }

  //multi Inner Image Upload
  @Post('/registering/inner/uploads')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      //이미지 명은 passport를 활용하여 사용자 정보를 받은후 사용자의 id or 이미지 id를 활용하여 파일 명 변경
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFiles(@UploadedFiles() files) {
    const response = [];
    if (files.length === 0) return { message: 'fils not found' };
    files.map((element) => {
      const fileReponse = {
        originalname: element.originalname,
        filename: files.filename,
      };
      response.push(fileReponse);
    });
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
    };
  }
  ///////////////////////////////////

  @Get('/chart/user')
  async getChartUserInfo(
    @Query() sqlCount: IBasicQuery,
  ) {
    return this.adminService.getChartUserInfo(sqlCount);
  }

  @Get('/chart/parking/:startpoint/:endpoint')
  async getChartParkingInfo(
    @Param("startpoint") startPoint: number,
    @Param("endpoint") endpoint: number,
    @Query() sqlCount: IBasicQuery,
  ) {
    return this.adminService.getChartParkingInfo(startPoint, endpoint, sqlCount)
  }

  @Get('/chart/exituser')
  async getChartExitUserInfo(
    @Query() endpoint: number
  ) {
    return this.adminService.getChartExitUserInfo(endpoint)
  }

  @Get('/chart/totalcount')
  async getChartTotalInfo() { }
}
