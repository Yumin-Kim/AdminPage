export class UpdateDashBoardDto {
  id?: number;
  title?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class CreateDashBoardDto {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  adminId: number;
  groupId: number;
}

export class SignUpUserDto {
  name: string;
  password: string;
  email: string;
  group: number;
  M_days: number[];
}

export class LoginUserDto {
  email: string;
  password: string;
}

export class RegisterInnerUser {
  name: string;
  memberIndex: number;
  host: boolean;
  createdAt: Date;
  birth: Date;
  group: number;
  groupbygroup: number;
  phoneNumber: string;
  // imageCount: number;

  // M_images: number;
}

export class RegisterOutterUser {
  name: string;
  description: string;
  createdAt: Date;
  phoneNumber: number;
  user: number;
  group: number;
  groupbygroup: number;

  m_outterImages: number;
}
