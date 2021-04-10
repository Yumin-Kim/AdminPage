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
