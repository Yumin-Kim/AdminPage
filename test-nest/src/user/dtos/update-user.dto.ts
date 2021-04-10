import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

// export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class UpdateUserDto {
  readonly name?: string;
  readonly memeberIndex?: number;
  readonly host?: boolean;
  readonly birth?: Date;
  readonly phoneNumber?: string;
}
