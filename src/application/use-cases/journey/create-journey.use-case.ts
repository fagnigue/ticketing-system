import { JourneyRepository } from 'src/application/repositories/journey.repository';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { Journey } from 'src/domain/entities/journey';

export interface CreateJourneyUseCaseRequest {
  label: string;
  departureDate: Date;
  departurePlace: string;
  arrivalPlace: string;
}

export interface CreateJourneyUseCaseResponse {
  journey: Journey;
}

@Injectable()
export class CreateJourneyUseCase
  implements UseCase<CreateJourneyUseCaseRequest, CreateJourneyUseCaseResponse>
{
  constructor(private readonly journeyRepository: JourneyRepository) {}

  async execute(
    data: CreateJourneyUseCaseRequest,
  ): Promise<CreateJourneyUseCaseResponse> {
    const journey = new Journey(data);
    const createdJourney = await this.journeyRepository.createJourney(journey);

    return { journey: createdJourney };
  }
}
