import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString, ValidateNested } from 'class-validator';
import { JourneyDTO } from '../journey/journey.dto';

export class SeatDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  journeyId: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @ValidateNested()
  @Type(() => JourneyDTO)
  journey: JourneyDTO;
}
