import { PartialType } from '@nestjs/swagger';
import { CreateSeatDTO } from './create-seat.dto';

export class UpdateSeatDTO extends PartialType(CreateSeatDTO) {}
