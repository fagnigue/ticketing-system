import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReservationRepository } from 'src/application/repositories/reservation.repository';
import { Reservation } from 'src/domain/entities/reservation';
import { NotFound } from 'src/utils/constants/exception-messages';
import { UseCase } from '../use-case';

export interface DeleteReservationUseCaseRequest {
  reservationId: string;
}

@Injectable()
export class DeleteReservationUseCase
  implements UseCase<DeleteReservationUseCaseRequest, void>
{
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(data: DeleteReservationUseCaseRequest): Promise<void> {
    const { reservationId } = data;
    const reservation = await this.reservationRepository.getReservation(
      reservationId,
    );

    if (!reservation.id) {
      throw new HttpException(
        NotFound(Reservation.name),
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.reservationRepository.deleteReservation(reservationId);
  }
}
