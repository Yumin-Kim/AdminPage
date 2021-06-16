import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { VotingModule } from './voting/voting.module';
import { PetitionModule } from './petition/petition.module';
import { FacilityModule } from './facility/facility.module';
import { PricingModule } from './pricing/pricing.module';
import { UsercarModule } from './usercar/usercar.module';

import { AuthModule } from './auth/auth.module';
import { UsedcarModule } from './usedcar/usedcar.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'wjqrmsrma!wl6311',
      database: 'test',
      entities: [__dirname + './**/**/*/entitiy{.ts}'],
      autoLoadEntities: true,
      synchronize: true,
      charset: 'utf8mb4_unicode_ci',
      // extra: {
      //   ' charset ': ' utf8mb4_unicode_ci ',
      // },
    }),
    AuthModule,
    UserModule,
    AdminModule,
    VotingModule,
    PetitionModule,
    FacilityModule,
    UsercarModule,
    PricingModule,
    UsedcarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
