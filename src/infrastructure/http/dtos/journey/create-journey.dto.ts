import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateJourneyDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  departureDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  departurePlace: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  arrivalPlace: string;
}
