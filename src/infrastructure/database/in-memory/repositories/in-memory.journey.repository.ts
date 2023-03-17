import { Injectable } from '@nestjs/common';
import { JourneyRepository } from 'src/application/repositories/journey.repository';
import { Journey } from 'src/domain/entities/journey';
import { GetJourneysParams } from 'src/utils/types/get-journeys-params.type';
import * as random from 'random-string-generator';

export const journeysCollection = [
  {
    id: '6411dc3596e3d543f409adc8',
    createdAt: new Date('2023-03-15T14:54:45.923Z'),
    updatedAt: new Date('2023-03-15T14:54:45.925Z'),
    label: 'Abidjan - Bouaké',
    departureDate: new Date('2023-03-16T08:15:00.444Z'),
    departurePlace: 'Abidjan',
    arrivalPlace: 'Bouaké',
  },
  {
    id: '6411dc1f96e3d543f409adc7',
    createdAt: new Date('2023-03-15T14:54:23.304Z'),
    updatedAt: new Date('2023-03-15T14:54:23.304Z'),
    label: 'Abidjan - Korhogo',
    departureDate: new Date('2023-03-16T08:00:00.444Z'),
    departurePlace: 'Abidjan',
    arrivalPlace: 'Korhogo',
  },
];

@Injectable()
export class InMemoryJourneyRepository implements JourneyRepository {
  private journeys: Journey[] = journeysCollection.map(
    (journey) => new Journey(journey),
  );

  async createJourney(journey: Journey): Promise<Journey> {
    journey.id = journey?.id || random();
    journey.createdAt = new Date();
    this.journeys.push(journey);
    const savedJourney =
      this.journeys.find((journey) => journey.id === journey.id) ?? null;
    return savedJourney;
  }

  async getJourney(id: string): Promise<Journey> {
    const journey = this.journeys.find((journey) => journey.id === id) ?? null;
    return journey;
  }

  async getJourneys(params: GetJourneysParams): Promise<Journey[]> {
    const journeys = this.journeys.filter(
      (journey) =>
        (journey.departureDate == params?.departureDate ||
          journey.departurePlace == params?.departurePlace ||
          journey.arrivalPlace == params?.arrivalPlace) ??
        true,
    );
    return journeys;
  }

  async updateJourney(journey: Journey): Promise<Journey> {
    const journeyIndex =
      this.journeys.findIndex((journey) => journey.id === journey.id) ?? null;

    this.journeys[journeyIndex] = new Journey({
      id: this.journeys[journeyIndex].id,
      createdAt: this.journeys[journeyIndex].createdAt,
      updatedAt: new Date(),
      label: journey.label || this.journeys[journeyIndex].label,
      departureDate:
        journey.departureDate || this.journeys[journeyIndex].departureDate,
      departurePlace:
        journey.departurePlace || this.journeys[journeyIndex].departurePlace,
      arrivalPlace:
        journey.arrivalPlace || this.journeys[journeyIndex].arrivalPlace,
    });

    return this.journeys[journeyIndex];
  }

  async deleteJourney(id: string): Promise<void> {
    const filteredJourneys = this.journeys.filter(
      (journey) => journey.id !== id,
    );
    this.journeys = filteredJourneys;
  }
}
