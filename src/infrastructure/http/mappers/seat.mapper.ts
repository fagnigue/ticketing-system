import { Seat } from 'src/domain/entities/seat';
import { SeatDTO } from '../dtos/seat/seat.dto';
import { JourneyMapper } from './journey.mapper';

export class SeatMapper {
  private constructor() {
    throw new Error(
      'SeatMapper is a static class and should not be instantiated',
    );
  }

  public static toDto(seat: Seat): SeatDTO {
    return {
      id: seat?.id,
      createdAt: seat?.createdAt,
      updatedAt: seat?.updatedAt,
      journeyId: seat?.journeyId,
      journey: JourneyMapper.toDto(seat?.journey),
    };
  }
}
