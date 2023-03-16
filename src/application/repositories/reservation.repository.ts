import { Reservation } from 'src/domain/entities/reservation';
import { GetReservationsParams } from 'src/utils/types/get-reservations-params.type';

export abstract class ReservationRepository {
  abstract createReservation(reservation: Reservation): Promise<Reservation>;
  abstract getReservation(id: string): Promise<Reservation>;
  abstract updateReservation(reservation: Reservation): Promise<Reservation>;
  abstract deleteReservation(id: string): Promise<void>;
  abstract getReservations(
    params: GetReservationsParams,
  ): Promise<Reservation[]>;
}
