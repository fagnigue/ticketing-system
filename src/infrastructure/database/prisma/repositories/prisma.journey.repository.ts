import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JourneyRepository } from 'src/application/repositories/journey.repository';
import { Journey } from 'src/domain/entities/journey';
import { PrismaService } from '../prisma.service';
import { Journey as PrismaJourney } from '@prisma/client';
import { GetJourneysParams } from 'src/utils/types/get-journeys-params.type';
import { CannotDelete } from 'src/utils/constants/exception-messages';

@Injectable()
export class PrismaJourneyRepository implements JourneyRepository {
  constructor(private prisma: PrismaService) {}

  async createJourney(journey: Journey): Promise<Journey> {
    const data = this.toPrisma(journey);
    const createdJourney = await this.prisma.journey.create({ data });
    return this.toDomain(createdJourney);
  }

  async getJourney(id: string): Promise<Journey> {
    const journey = await this.prisma.journey.findUnique({
      where: {
        id,
      },
    });

    return this.toDomain(journey);
  }

  async updateJourney(journey: Journey): Promise<Journey> {
    const { id, ...data } = this.toPrisma(journey);
    const updatedJourney = await this.prisma.journey.update({
      where: {
        id,
      },
      data,
    });

    return this.toDomain(updatedJourney);
  }

  async deleteJourney(id: string): Promise<void> {
    try {
      await this.prisma.journey.update({
        where: {
          id,
        },
        data: {
          deleted: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        CannotDelete(Journey.name),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getJourneys(params: GetJourneysParams): Promise<Journey[]> {
    const journeys = await this.prisma.journey.findMany({
      where: {
        deleted: {
          isSet: false,
        },
        departureDate: params?.departureDate,
        departurePlace: {
          contains: params?.departurePlace,
          mode: 'insensitive',
        },
        arrivalPlace: {
          contains: params?.arrivalPlace,
          mode: 'insensitive',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return journeys.map((journey) => this.toDomain(journey));
  }

  public toPrisma(journey: Journey): PrismaJourney {
    return {
      id: journey.id,
      label: journey.label,
      createdAt: journey.createdAt,
      updatedAt: journey.updatedAt,
      departureDate: journey.departureDate,
      departurePlace: journey.departurePlace,
      arrivalPlace: journey.arrivalPlace,
      deleted: journey.deleted,
    };
  }

  public toDomain(journey: PrismaJourney): Journey {
    return new Journey(journey);
  }
}
