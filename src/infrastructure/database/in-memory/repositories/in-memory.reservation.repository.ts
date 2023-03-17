import { Injectable } from '@nestjs/common';
import { ReservationRepository } from 'src/application/repositories/reservation.repository';
import { Reservation } from 'src/domain/entities/reservation';
import { GetReservationsParams } from 'src/utils/types/get-reservations-params.type';
import * as random from 'random-string-generator';
import { seatCollections } from './in-memory.seat.repository';
import { journeysCollection } from './in-memory.journey.repository';

export const reservationsCollection = [
  {
    id: '6412dfc7227e7a656668b6ca',
    createdAt: new Date('2023-03-16T09:22:15.243Z'),
    cancelledAt: new Date('2023-03-16T09:29:54.948Z'),
    userId: '6412df35f7c2e3f40d44e2e7',
    seatId: '641217aae61c5d1a800c74be',
  },
  {
    id: '6412e038a2161d3e0ab5b2e0',
    createdAt: new Date('2023-03-16T09:24:08.243Z'),
    userId: '6412df35f7c2e3f40d44e2e7',
    seatId: '64121779fc34fab94f36ffb2',
  },
];
@Injectable()
export class InMemoryReservationRepository implements ReservationRepository {
  private reservations: Reservation[] = reservationsCollection.map(
    (reservation) => new Reservation(reservation),
  );

  async createReservation(reservation: Reservation): Promise<Reservation> {
    reservation.id = reservation?.id || random();
    reservation.createdAt = new Date();
    this.reservations.push(reservation);
    const savedSeat =
      this.reservations.find(
        (reservation) => reservation.id === reservation.id,
      ) ?? null;
    return savedSeat;
  }

  async getReservation(id: string): Promise<Reservation> {
    const reservation =
      this.reservations.find((reservation) => reservation.id === id) ?? null;
    return reservation;
  }

  async updateReservation(reservation: Reservation): Promise<Reservation> {
    const seatIndex =
      this.reservations.findIndex(
        (reservation) => reservation.id === reservation.id,
      ) ?? null;
    this.reservations[seatIndex] = new Reservation({
      id: this.reservations[seatIndex].id,
      createdAt: this.reservations[seatIndex].createdAt,
      userId: reservation.userId || this.reservations[seatIndex].userId,
      seatId: reservation.seatId || this.reservations[seatIndex].seatId,
      cancelledAt:
        reservation.cancelledAt || this.reservations[seatIndex].cancelledAt,
    });
    return this.reservations[seatIndex];
  }

  async deleteReservation(id: string): Promise<void> {
    const filteredReservations = this.reservations.filter((j) => j.id !== id);
    this.reservations = filteredReservations;
  }

  async getReservations(params: GetReservationsParams): Promise<Reservation[]> {
    const reservations = this.reservations.filter((reservation) => {
      const seat = seatCollections.find(
        (seat) => seat.id === reservation.seatId,
      );
      const journey = journeysCollection.find(
        (journey) => journey.id === seat?.journeyId,
      );
      return (reservation.userId === params?.userId || journey) ?? true;
    });
    return reservations;
  }
}
