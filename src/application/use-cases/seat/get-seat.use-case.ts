import { Injectable } from '@nestjs/common';
import { SeatRepository } from 'src/application/repositories/seat.repository';
import { Seat } from 'src/domain/entities/seat';
import { UseCase } from '../use-case';

export interface GetSeatUseCaseRequest {
  seatId: string;
}

export interface GetSeatUseCaseResponse {
  seat: Seat;
}

@Injectable()
export class GetSeatUseCase
  implements UseCase<GetSeatUseCaseRequest, GetSeatUseCaseResponse>
{
  constructor(private readonly seatRepository: SeatRepository) {}

  async execute(data: GetSeatUseCaseRequest): Promise<GetSeatUseCaseResponse> {
    const { seatId } = data;
    const seat = await this.seatRepository.getSeat(data.seatId);

    return { seat };
  }
}
