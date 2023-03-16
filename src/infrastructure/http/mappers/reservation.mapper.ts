import { Reservation } from 'src/domain/entities/reservation';
import { ReservationDTO } from '../dtos/reservation/reservation.dto';
import { SeatMapper } from './seat.mapper';
import { UserMapper } from './user.mapper';

export class ReservationMapper {
  private constructor() {
    throw new Error(
      'SeatMapper is a static class and should not be instantiated',
    );
  }

  public static toDto(reservation: Reservation): ReservationDTO {
    return {
      id: reservation?.id,
      createdAt: reservation?.createdAt,
      cancelledAt: reservation?.cancelledAt ?? undefined,
      userId: reservation?.userId,
      seatId: reservation?.seatId,
      user: UserMapper.toDto(reservation?.user),
      seat: SeatMapper.toDto(reservation?.seat),
    };
  }
}
