import { JourneyRepository } from 'src/application/repositories/journey.repository';
import { Injectable } from '@nestjs/common';
import { Journey } from 'src/domain/entities/journey';
import { UseCase } from '../use-case';

export interface UpdateJourneyUseCaseRequest {
  id: string;
  label?: string;
  departureDate?: Date;
  departurePlace?: string;
  arrivalPlace?: string;
}

export interface UpdateJourneyUseCaseResponse {
  journey: Journey;
}

@Injectable()
export class UpdateJourneyUseCase
  implements UseCase<UpdateJourneyUseCaseRequest, UpdateJourneyUseCaseResponse>
{
  constructor(private readonly journeyRepository: JourneyRepository) {}

  async execute(
    data: UpdateJourneyUseCaseRequest,
  ): Promise<UpdateJourneyUseCaseResponse> {
    const journey = new Journey(data);
    journey.updatedAt = new Date();

    const updatedJourney = await this.journeyRepository.updateJourney(journey);

    return { journey: updatedJourney };
  }
}
