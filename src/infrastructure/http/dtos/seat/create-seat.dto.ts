import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSeatDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  journeyId: string;
}
