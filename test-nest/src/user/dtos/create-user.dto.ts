import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly age: number;

  @IsOptional()
  @IsString({ each: true })
  readonly address: string;
}
