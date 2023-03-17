import { InMemorySeatRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.seat.repository';
import { DeleteSeatUseCase } from './delete-seat.use-case';

describe('DeleteSeatUseCase', () => {
  it('should delete seat', async () => {
    const seatRepository = new InMemorySeatRepository();
    const deleteSeatUseCase = new DeleteSeatUseCase(seatRepository);

    const response = await deleteSeatUseCase.execute({
      seatId: '641215d06031ce3c1ef1ac53',
    });

    expect(response).toBe(void 0);
  });
});
