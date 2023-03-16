import { Injectable } from '@nestjs/common';
import { ReservationRepository } from 'src/application/repositories/reservation.repository';
import { Reservation } from 'src/domain/entities/reservation';
import { PrismaService } from '../prisma.service';
import {
  Reservation as PrismaReservation,
  User as PrismUser,
  Seat as PrismaSeat,
} from '@prisma/client';
import { User } from 'src/domain/entities/user';
import { Seat } from 'src/domain/entities/seat';
import { GetReservationsParams } from 'src/utils/types/get-reservations-params.type';

export type ReservationWithSeatAndUserIncluded = PrismaReservation & {
  user?: PrismUser;
  seat?: PrismaSeat;
};

@Injectable()
export class PrismaReservationRepository implements ReservationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createReservation(reservation: Reservation): Promise<Reservation> {
    const data = this.toPrisma(reservation);
    const createdReservation = await this.prisma.reservation.create({
      data,
      include: {
        user: true,
        seat: {
          include: {
            journey: true,
          },
        },
      },
    });
    return this.toDomain(createdReservation);
  }

  async getReservation(id: string): Promise<Reservation> {
    const reservation = await this.prisma.reservation.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        seat: {
          include: {
            journey: true,
          },
        },
      },
    });

    return this.toDomain(reservation);
  }

  async updateReservation(reservation: Reservation): Promise<Reservation> {
    const { id, ...rest } = this.toPrisma(reservation);
    const updatedReservation = await this.prisma.reservation.update({
      where: {
        id,
      },
      data: rest,
      include: {
        user: true,
        seat: {
          include: {
            journey: true,
          },
        },
      },
    });
    return this.toDomain(updatedReservation);
  }

  async deleteReservation(id: string): Promise<void> {
    await this.prisma.reservation.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
  }

  async getReservations(params: GetReservationsParams): Promise<Reservation[]> {
    const reservations = await this.prisma.reservation.findMany({
      where: {
        userId: params.userId,
        seat: {
          journeyId: params.journeyId,
        },
      },
      include: {
        user: true,
        seat: {
          include: {
            journey: true,
          },
        },
      },
    });

    return reservations.map((reservation) => this.toDomain(reservation));
  }

  public toPrisma(reservation: Reservation): PrismaReservation {
    return {
      id: reservation.id,
      createdAt: reservation.createdAt,
      userId: reservation.userId,
      seatId: reservation.seatId,
      cancelledAt: reservation.cancelledAt,
      deleted: reservation.deleted,
    };
  }

  public toDomain(
    reservation: ReservationWithSeatAndUserIncluded,
  ): Reservation {
    const { user, seat, ...rest } = reservation;
    const newUser = new User(user);
    const newSeat = new Seat(seat);
    const newReservation = new Reservation({
      user: newUser,
      seat: newSeat,
      ...rest,
    });
    return newReservation;
  }
}
