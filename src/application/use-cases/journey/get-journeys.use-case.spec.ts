import { Journey } from 'src/domain/entities/journey';
import { InMemoryJourneyRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.journey.repository';
import { GetJourneysUseCase } from './get-journeys.use-case';

describe('GetJourneysUseCase', () => {
  it('should return list of journeys', async () => {
    const journeyRepository = new InMemoryJourneyRepository();
    const getJourneysUseCase = new GetJourneysUseCase(journeyRepository);

    const response = await getJourneysUseCase.execute({});

    expect(response).toBeInstanceOf(Array<Journey>);
  });
});
