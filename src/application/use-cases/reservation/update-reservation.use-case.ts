import { Injectable } from '@nestjs/common';
import { ReservationRepository } from 'src/application/repositories/reservation.repository';
import { Reservation } from 'src/domain/entities/reservation';
import { UseCase } from '../use-case';

export interface UpdateReservationUseCaseRequest {
  reservationId: string;
  userId?: string;
  seatId?: string;
}

export interface UpdateReservationUseCaseResponse {
  reservation: Reservation;
}

@Injectable()
export class UpdateReservationUseCase
  implements
    UseCase<UpdateReservationUseCaseRequest, UpdateReservationUseCaseResponse>
{
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(
    data: UpdateReservationUseCaseRequest,
  ): Promise<UpdateReservationUseCaseResponse> {
    const reservation = new Reservation(data);
    const updatedReservation =
      await this.reservationRepository.updateReservation(reservation);
    return { reservation: updatedReservation };
  }
}
