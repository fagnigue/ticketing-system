import { Seat } from 'src/domain/entities/seat';
import { InMemorySeatRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.seat.repository';
import { GetSeatsUseCase } from './get-seats.use-case';

describe('GetAvailableSeatByJourneyUseCase', () => {
  it('should return list of seats', async () => {
    const seatRepository = new InMemorySeatRepository();
    const getSeatsUseCase = new GetSeatsUseCase(seatRepository);

    const response = await getSeatsUseCase.execute({
      journeyId: '6411dc3596e3d543f409adc8',
    });

    expect(response).toBeInstanceOf(Array<Seat>);
  });
});
