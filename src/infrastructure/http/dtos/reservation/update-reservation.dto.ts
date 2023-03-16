import { PartialType } from '@nestjs/swagger';
import { CreateReservationDTO } from './create-reservation.dto';

export class UpdateReservationDTO extends PartialType(CreateReservationDTO) {}
