import { DeleteJourneyUseCase } from './delete-journey.use-case';
import { InMemoryJourneyRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.journey.repository';

describe('DeleteJourneyUseCase', () => {
  it('should delete journey', async () => {
    const journeyRepository = new InMemoryJourneyRepository();
    const deleteJourneyUseCase = new DeleteJourneyUseCase(journeyRepository);

    const response = await deleteJourneyUseCase.execute({
      journeyId: '6411dc3596e3d543f409adc8',
    });

    expect(response).toBe(void 0);
  });
});
