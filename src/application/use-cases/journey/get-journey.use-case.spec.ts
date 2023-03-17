import { Journey } from 'src/domain/entities/journey';
import { InMemoryJourneyRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.journey.repository';
import { GetJourneyUseCase } from './get-journey.use-case';

describe('GetJourneyUseCase', () => {
  it('should return journey', async () => {
    const journeyRepository = new InMemoryJourneyRepository();
    const getJourneyUseCase = new GetJourneyUseCase(journeyRepository);

    const response = await getJourneyUseCase.execute({
      journeyId: '6411dc3596e3d543f409adc8',
    });

    expect(response.journey).toBeInstanceOf(Journey);
    expect(response.journey.id).toBe('6411dc3596e3d543f409adc8');
  });
});
