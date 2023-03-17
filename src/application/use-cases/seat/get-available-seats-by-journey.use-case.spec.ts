import { Seat } from 'src/domain/entities/seat';
import { InMemorySeatRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.seat.repository';
import { GetAvailableSeatsByJourneyUseCase } from './get-available-seats-by-journey.use-case';

describe('GetAvailableSeatByJourneyUseCase', () => {
  it('should return list of seats', async () => {
    const seatRepository = new InMemorySeatRepository();
    const getAvailableSeatsByJourneyUseCase =
      new GetAvailableSeatsByJourneyUseCase(seatRepository);

    const response = await getAvailableSeatsByJourneyUseCase.execute({
      journeyId: '6411dc3596e3d543f409adc8',
    });

    expect(response).toBeInstanceOf(Array<Seat>);
  });
});
