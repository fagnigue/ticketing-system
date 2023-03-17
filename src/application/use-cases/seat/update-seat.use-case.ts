import { Injectable } from '@nestjs/common';
import { SeatRepository } from 'src/application/repositories/seat.repository';
import { Seat } from 'src/domain/entities/seat';
import { UseCase } from '../use-case';

export interface UpdateSeatUseCaseRequest {
  id?: string;
  journeyId?: string;
}

export interface UpdateSeatUseCaseResponse {
  seat: Seat;
}

@Injectable()
export class UpdateSeatUseCase
  implements UseCase<UpdateSeatUseCaseRequest, UpdateSeatUseCaseResponse>
{
  constructor(private readonly seatRepository: SeatRepository) {}

  async execute(
    data: UpdateSeatUseCaseRequest,
  ): Promise<UpdateSeatUseCaseResponse> {
    const seat = new Seat(data);
    const updatedSeat = await this.seatRepository.updateSeat(seat);

    return { seat: updatedSeat };
  }
}
