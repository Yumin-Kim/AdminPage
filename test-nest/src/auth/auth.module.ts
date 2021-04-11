import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'src/admin/admin.module';
import { Admins } from 'src/admin/entities/admin.entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule, forwardRef(() => AdminModule)],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
