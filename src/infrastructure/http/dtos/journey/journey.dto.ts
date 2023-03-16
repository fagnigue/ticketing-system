import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class JourneyDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  label: string;

  @ApiProperty()
  @IsDate()
  departureDate: Date;

  @ApiProperty()
  @IsString()
  departurePlace: string;

  @ApiProperty()
  @IsString()
  arrivalPlace: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
