import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { VotingController } from './voting/voting.controller';
import { VotingModule } from './voting/voting.module';
import { PetitionService } from './petition/petition.service';
import { PetitionController } from './petition/petition.controller';
import { PetitionModule } from './petition/petition.module';
import { FacilityModule } from './facility/facility.module';
import { PricingService } from './pricing/pricing.service';
import { PricingModule } from './pricing/pricing.module';
import { UsercarModule } from './usercar/usercar.module';
import { FacilityController } from './facility/facility.controller';
import { PricingController } from './pricing/pricing.controller';
import { UserController } from './user/user.controller';
import { UsercarController } from './usercar/usercar.controller';
import { AdminService } from './admin/admin.service';
import { FacilityService } from './facility/facility.service';
import { UserService } from './user/user.service';
import { UsercarService } from './usercar/usercar.service';
import { VotingService } from './voting/voting.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'test',
      entities: [__dirname + './**/**/*/entitiy{.ts}'],
      autoLoadEntities: true,
      synchronize: true,
      charset: 'utf8mb4',
    }),
    AuthModule,
    UserModule,
    AdminModule,
    VotingModule,
    PetitionModule,
    FacilityModule,
    UsercarModule,
    PricingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
