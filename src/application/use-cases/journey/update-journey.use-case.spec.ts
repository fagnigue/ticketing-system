import { Journey } from 'src/domain/entities/journey';
import { InMemoryJourneyRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.journey.repository';
import { UpdateJourneyUseCase } from './update-journey.use-case';

describe('UpdateJourneyUseCase', () => {
  it('should return journey', async () => {
    const journeyRepository = new InMemoryJourneyRepository();
    const updateJourneyUseCase = new UpdateJourneyUseCase(journeyRepository);

    const journeyUpdateInput = {
      id: '6411dc3596e3d543f409adc8',
      label: 'Abidjan - Bouaké',
      departureDate: new Date(),
      departurePlace: 'Abidjan',
      arrivalPlace: 'Bouaké',
    };

    const response = await updateJourneyUseCase.execute(journeyUpdateInput);

    expect(response.journey).toBeInstanceOf(Journey);
    expect(response.journey.departureDate).toBe(
      journeyUpdateInput.departureDate,
    );
    expect(response.journey.updatedAt).toBeDefined();
  });
});
