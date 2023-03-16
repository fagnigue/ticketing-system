import { JourneyRepository } from 'src/application/repositories/journey.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { Journey } from 'src/domain/entities/journey';
import { NotFound } from 'src/utils/constants/exception-messages';

export interface DeleteJourneyUseCaseRequest {
  journeyId: string;
}

@Injectable()
export class DeleteJourneyUseCase
  implements UseCase<DeleteJourneyUseCaseRequest, void>
{
  constructor(private readonly journeyRepository: JourneyRepository) {}

  async execute(data: DeleteJourneyUseCaseRequest): Promise<void> {
    const { journeyId } = data;
    const journey = await this.journeyRepository.getJourney(journeyId);

    console.log(journey);

    if (!journey.id) {
      throw new HttpException(NotFound(Journey.name), HttpStatus.BAD_REQUEST);
    }

    await this.journeyRepository.deleteJourney(journeyId);
  }
}
