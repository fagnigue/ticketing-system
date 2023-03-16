import { Injectable } from '@nestjs/common';
import { SeatRepository } from 'src/application/repositories/seat.repository';
import { Seat } from 'src/domain/entities/seat';
import { UseCase } from '../use-case';

export interface CreateSeatUseCasRequest {
  journeyId: string;
}

export interface CreateSeatUseCaseResponse {
  seat: Seat;
}

@Injectable()
export class CreateSeatUseCase
  implements UseCase<CreateSeatUseCasRequest, CreateSeatUseCaseResponse>
{
  constructor(private readonly seatRepository: SeatRepository) {}

  async execute(
    data: CreateSeatUseCasRequest,
  ): Promise<CreateSeatUseCaseResponse> {
    const seat = new Seat(data);
    const createdSeat = await this.seatRepository.createSeat(seat);
    return { seat: createdSeat };
  }
}
