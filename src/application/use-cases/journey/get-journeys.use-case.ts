import { Injectable } from '@nestjs/common';
import { JourneyRepository } from 'src/application/repositories/journey.repository';
import { Journey } from 'src/domain/entities/journey';
import { GetJourneysParams } from 'src/utils/types/get-journeys-params.type';
import { UseCase } from '../use-case';

@Injectable()
export class GetJourneysUseCase
  implements UseCase<GetJourneysParams, Journey[]>
{
  constructor(private readonly journeyRepository: JourneyRepository) {}

  async execute(data: GetJourneysParams): Promise<Journey[]> {
    return await this.journeyRepository.getJourneys(data);
  }
}
