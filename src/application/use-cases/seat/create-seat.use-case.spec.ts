import { Seat } from 'src/domain/entities/seat';
import { InMemorySeatRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.seat.repository';
import { CreateSeatUseCase } from './create-seat.use-case';

describe('CreateSeatUseCase', () => {
  it('should return seat', async () => {
    const seatRepository = new InMemorySeatRepository();
    const createSeatUseCase = new CreateSeatUseCase(seatRepository);

    const seatCreateInput = {
      journeyId: '6411dc1f96e3d543f409adc7',
    };

    const response = await createSeatUseCase.execute(seatCreateInput);

    expect(response.seat).toBeInstanceOf(Seat);
    expect(response.seat.createdAt).toBeInstanceOf(Date);
    expect(response.seat.id).toBeDefined();
  });
});
