import { Injectable } from '@nestjs/common';
import { ReservationRepository } from 'src/application/repositories/reservation.repository';
import { Reservation } from 'src/domain/entities/reservation';
import { UseCase } from '../use-case';

export interface GetReservationUseCaseRequest {
  reservationId: string;
}

export interface GetReservationUseCaseResponse {
  reservation: Reservation;
}

@Injectable()
export class GetReservationUseCase
  implements
    UseCase<GetReservationUseCaseRequest, GetReservationUseCaseResponse>
{
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(
    data: GetReservationUseCaseRequest,
  ): Promise<GetReservationUseCaseResponse> {
    const { reservationId } = data;
    const reservation = await this.reservationRepository.getReservation(
      reservationId,
    );
    return { reservation };
  }
}
