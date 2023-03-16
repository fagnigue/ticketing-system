import { Seat } from 'src/domain/entities/seat';
import { GetAvailableSeatsByJourney } from 'src/utils/types/get-available-seats-by-journey.type';
import { GetSeatsParams } from 'src/utils/types/get-seats-params.type';

export abstract class SeatRepository {
  abstract createSeat(seat: Seat): Promise<Seat>;
  abstract getSeat(id: string): Promise<Seat>;
  abstract updateSeat(seat: Seat): Promise<Seat>;
  abstract deleteSeat(id: string): Promise<void>;
  abstract getSeats(params: GetSeatsParams): Promise<Seat[]>;
  abstract getAvailableSeatsByJourney(
    params: GetAvailableSeatsByJourney,
  ): Promise<Seat[]>;
}
