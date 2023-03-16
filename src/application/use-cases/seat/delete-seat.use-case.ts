import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SeatRepository } from 'src/application/repositories/seat.repository';
import { Seat } from 'src/domain/entities/seat';
import { NotFound } from 'src/utils/constants/exception-messages';
import { UseCase } from '../use-case';

export interface DeleteSeatUseCaseRequest {
  seatId: string;
}

@Injectable()
export class DeleteSeatUseCase
  implements UseCase<DeleteSeatUseCaseRequest, void>
{
  constructor(private readonly seatRepository: SeatRepository) {}

  async execute(data: DeleteSeatUseCaseRequest): Promise<void> {
    const { seatId } = data;
    const seat = await this.seatRepository.getSeat(seatId);
    if (!seat.id) {
      throw new HttpException(NotFound(Seat.name), HttpStatus.BAD_REQUEST);
    }
    await this.seatRepository.deleteSeat(seatId);
  }
}
