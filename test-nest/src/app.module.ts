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
      host: '172.17.0.1',
      port: 3306,
      username: 'root',
      password: 'nodejs',
      database: 'schooladmindatabase',
      entities: [__dirname + './**/**/*/entitiy{.ts}'],
      autoLoadEntities: true,
      synchronize: true,
      charset: 'utf8mb4_unicode_ci',
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
