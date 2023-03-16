import { Injectable } from '@nestjs/common';
import { SeatRepository } from 'src/application/repositories/seat.repository';
import { Seat } from 'src/domain/entities/seat';
import { UseCase } from '../use-case';

export interface GetAvailableSeatsByJourneyUseCaseRequest {
  journeyId: string;
}

@Injectable()
export class GetAvailableSeatsByJourneyUseCase
  implements UseCase<GetAvailableSeatsByJourneyUseCaseRequest, Seat[]>
{
  constructor(private readonly seatRepository: SeatRepository) {}

  async execute(
    data: GetAvailableSeatsByJourneyUseCaseRequest,
  ): Promise<Seat[]> {
    const seats = await this.seatRepository.getAvailableSeatsByJourney(data);
    return seats;
  }
}
