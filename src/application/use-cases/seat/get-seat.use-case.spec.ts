import { Seat } from 'src/domain/entities/seat';
import { InMemorySeatRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.seat.repository';
import { GetSeatUseCase } from './get-seat.use-case';

describe('GetSeatUseCase', () => {
  it('should return seat', async () => {
    const seatRepository = new InMemorySeatRepository();
    const getSeatUseCase = new GetSeatUseCase(seatRepository);

    const response = await getSeatUseCase.execute({
      seatId: '641215d06031ce3c1ef1ac53',
    });

    expect(response.seat).toBeInstanceOf(Seat);
    expect(response.seat.id).toBe('641215d06031ce3c1ef1ac53');
  });
});
