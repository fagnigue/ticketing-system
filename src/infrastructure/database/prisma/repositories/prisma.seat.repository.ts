import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SeatRepository } from 'src/application/repositories/seat.repository';
import { Seat } from 'src/domain/entities/seat';
import { GetSeatsParams } from 'src/utils/types/get-seats-params.type';
import { PrismaService } from '../prisma.service';
import { Journey as PrismaJourney, Seat as PrismaSeat } from '@prisma/client';
import { Journey } from 'src/domain/entities/journey';
import { CannotDelete } from 'src/utils/constants/exception-messages';
import { GetAvailableSeatsByJourney } from 'src/utils/types/get-available-seats-by-journey.type';

export type SeatWithJourneyIncluded = PrismaSeat & {
  journey?: PrismaJourney;
};

@Injectable()
export class PrismaSeatRepository implements SeatRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSeat(seat: Seat): Promise<Seat> {
    const data = this.toPrisma(seat);
    const createdSeat = await this.prisma.seat.create({
      data,
    });

    return this.toDomain(createdSeat);
  }

  async getSeat(id: string): Promise<Seat> {
    const seat = await this.prisma.seat.findUnique({
      where: {
        id,
      },
      include: {
        journey: true,
      },
    });

    return this.toDomain(seat);
  }

  async updateSeat(seat: Seat): Promise<Seat> {
    const { id, ...data } = this.toPrisma(seat);
    const updatedSeat = await this.prisma.seat.update({
      where: {
        id,
      },
      data,
    });

    return this.toDomain(updatedSeat);
  }

  async deleteSeat(id: string): Promise<void> {
    await this.prisma.seat.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
  }

  async getSeats(params: GetSeatsParams): Promise<Seat[]> {
    const seats = await this.prisma.seat.findMany({
      where: {
        journeyId: params.journeyId,
        deleted: {
          isSet: false,
        },
      },
      include: {
        journey: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return seats.map((seat) => this.toDomain(seat));
  }

  async getAvailableSeatsByJourney(
    params: GetAvailableSeatsByJourney,
  ): Promise<Seat[]> {
    const { journeyId } = params;
    const seats = await this.prisma.seat.findMany({
      where: {
        deleted: {
          isSet: false,
        },
        journeyId,
        OR: [
          {
            reservations: {
              none: {},
            },
          },
          {
            reservations: {
              every: {
                cancelledAt: {
                  isSet: true,
                },
              },
            },
          },
        ],
      },
      include: {
        journey: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return seats.map((seat) => this.toDomain(seat));
  }

  public toPrisma(seat: Seat): PrismaSeat {
    return {
      id: seat.id,
      createdAt: seat.createdAt,
      updatedAt: seat.updatedAt,
      journeyId: seat.journeyId,
      deleted: seat.deleted,
    };
  }

  public toDomain(seat: SeatWithJourneyIncluded): Seat {
    const { journey, ...rest } = seat;
    const newJourney = new Journey(journey);
    const newSeat = new Seat({ ...rest, journey: newJourney });
    return newSeat;
  }
}
