import { Injectable } from '@nestjs/common';
import { SeatRepository } from 'src/application/repositories/seat.repository';
import { Seat } from 'src/domain/entities/seat';
import { GetSeatsParams } from 'src/utils/types/get-seats-params.type';
import { UseCase } from '../use-case';

@Injectable()
export class GetSeatsUseCase implements UseCase<GetSeatsParams, Seat[]> {
  constructor(private readonly seatRepository: SeatRepository) {}

  async execute(data: GetSeatsParams): Promise<Seat[]> {
    const seats = await this.seatRepository.getSeats(data);
    return seats;
  }
}
