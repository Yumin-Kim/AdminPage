import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(private adminService: AdminService) {}

  async signPayload(payload: any) {
    return sign(payload, 'secretKey', { expiresIn: '12h' });
  }

  async validateUser(payload: any): Promise<any> {
    console.log(payload);

    return await this.adminService.findOne(payload);
  }
}
