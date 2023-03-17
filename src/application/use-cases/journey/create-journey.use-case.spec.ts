import { Journey } from 'src/domain/entities/journey';
import { InMemoryJourneyRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.journey.repository';
import { CreateJourneyUseCase } from './create-journey.use-case';

describe('CreateJourneyUseCase', () => {
  it('should create journey', async () => {
    const journeyRepository = new InMemoryJourneyRepository();
    const createJourneyUseCase = new CreateJourneyUseCase(journeyRepository);

    const journeyCreateInput = {
      label: 'Abidjan - Ferkessedougou',
      departureDate: new Date('2023-03-16T07:30:00.444Z'),
      departurePlace: 'Abidjan',
      arrivalPlace: 'Ferkessedougou',
    };
    const response = await createJourneyUseCase.execute(journeyCreateInput);

    expect(response.journey).toBeInstanceOf(Journey);
    expect(response.journey.id).toBeDefined();
    expect(response.journey.createdAt).toBeInstanceOf(Date);
  });
});
