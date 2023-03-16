import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateReservationDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(24)
  @MaxLength(24)
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(24)
  @MaxLength(24)
  seatId: string;
}
