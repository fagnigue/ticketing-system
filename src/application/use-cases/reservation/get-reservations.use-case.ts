import { Injectable } from '@nestjs/common';
import { ReservationRepository } from 'src/application/repositories/reservation.repository';
import { Reservation } from 'src/domain/entities/reservation';
import { UseCase } from '../use-case';

export interface GetReservationsUseCaseRequest {
  userId: string;
  journeyId: string;
}

@Injectable()
export class GetReservationsUseCase
  implements UseCase<GetReservationsUseCaseRequest, Reservation[]>
{
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(data: GetReservationsUseCaseRequest): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.getReservations(data);
    return reservations;
  }
}
