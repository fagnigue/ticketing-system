import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsString } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date | null | undefined;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;
}
