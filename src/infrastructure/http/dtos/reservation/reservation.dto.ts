import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString, ValidateNested } from 'class-validator';
import { SeatDTO } from '../seat/seat.dto';
import { UserDTO } from '../user/user.dto';

export class ReservationDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  cancelledAt: Date;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  seatId: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UserDTO)
  user?: UserDTO;

  @ApiProperty()
  @ValidateNested()
  @Type(() => SeatDTO)
  seat?: SeatDTO;
}
