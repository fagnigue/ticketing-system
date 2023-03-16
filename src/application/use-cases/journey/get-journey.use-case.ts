import { JourneyRepository } from 'src/application/repositories/journey.repository';
import { Injectable } from '@nestjs/common';
import { Journey } from 'src/domain/entities/journey';
import { UseCase } from '../use-case';

export interface GetJourneyUseCaseRequest {
  journeyId: string;
}

export interface GetJourneyUseCaseResponse {
  journey: Journey;
}

@Injectable()
export class GetJourneyUseCase
  implements UseCase<GetJourneyUseCaseRequest, GetJourneyUseCaseResponse>
{
  constructor(private readonly journeyRepository: JourneyRepository) {}

  async execute(
    data: GetJourneyUseCaseRequest,
  ): Promise<GetJourneyUseCaseResponse> {
    const { journeyId } = data;
    const journey = await this.journeyRepository.getJourney(journeyId);
    return { journey };
  }
}
