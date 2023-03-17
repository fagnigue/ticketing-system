import { Injectable } from '@nestjs/common';
import { SeatRepository } from 'src/application/repositories/seat.repository';
import { Seat } from 'src/domain/entities/seat';
import { GetAvailableSeatsByJourney } from 'src/utils/types/get-available-seats-by-journey.type';
import { GetSeatsParams } from 'src/utils/types/get-seats-params.type';
import * as random from 'random-string-generator';
import { reservationsCollection } from './in-memory.reservation.repository';
export const seatCollections = [
  {
    id: '641217aae61c5d1a800c74be',
    createdAt: new Date('2023-03-15T19:08:25.218Z'),
    updatedAt: new Date('2023-03-15T19:08:25.218Z'),
    journeyId: '6411dc1f96e3d543f409adc7',
  },
  {
    id: '641215d06031ce3c1ef1ac53',
    createdAt: new Date('2023-03-15T19:00:31.203Z'),
    updatedAt: new Date('2023-03-15T19:00:31.203Z'),
    journeyId: '6411dd0ef9793ccb3193eefc',
  },
];

@Injectable()
export class InMemorySeatRepository implements SeatRepository {
  private seats: Seat[] = seatCollections.map((seat) => new Seat(seat));

  async createSeat(seat: Seat): Promise<Seat> {
    seat.id = seat?.id || random();
    seat.createdAt = new Date();
    this.seats.push(seat);
    const savedSeat = this.seats.find((seat) => seat.id === seat.id) ?? null;
    return savedSeat;
  }

  async getSeat(id: string): Promise<Seat> {
    const seat = this.seats.find((seat) => seat.id === id) ?? null;
    return seat;
  }

  async updateSeat(seat: Seat): Promise<Seat> {
    const seatIndex =
      this.seats.findIndex((seat) => seat.id === seat.id) ?? null;

    this.seats[seatIndex] = new Seat({
      id: this.seats[seatIndex].id,
      journeyId: seat.journeyId || this.seats[seatIndex].journeyId,
      createdAt: this.seats[seatIndex].createdAt,
      updatedAt: new Date(),
    });
    return this.seats[seatIndex];
  }

  async deleteSeat(id: string): Promise<void> {
    const filteredSeats = this.seats.filter((j) => j.id !== id);
    this.seats = filteredSeats;
  }

  async getSeats(params: GetSeatsParams): Promise<Seat[]> {
    const seats = this.seats.filter(
      (seat) => seat.journeyId === params?.journeyId ?? true,
    );
    return seats;
  }

  async getAvailableSeatsByJourney(
    params: GetAvailableSeatsByJourney,
  ): Promise<Seat[]> {
    const seats = this.seats.filter((seat) => {
      const reservations = reservationsCollection.filter(
        (reservation) => reservation.seatId === seat.id,
      );
      return (
        seat.journeyId === params?.journeyId ||
        !reservations ||
        reservations.every((reservation) => reservation.cancelledAt)
      );
    });
    return seats;
  }
}
