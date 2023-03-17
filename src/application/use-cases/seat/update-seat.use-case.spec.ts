import { Seat } from 'src/domain/entities/seat';
import { InMemorySeatRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.seat.repository';
import { UpdateSeatUseCase } from './update-seat.use-case';

describe('UpdateSeatUseCase', () => {
  it('should update seat', async () => {
    const seatRepository = new InMemorySeatRepository();
    const updateSeatUseCase = new UpdateSeatUseCase(seatRepository);

    const seatUpdateInput = {
      id: '641217aae61c5d1a800c74be',
      journeyId: '6411dc3596e3d543f409adc8',
    };

    const response = await updateSeatUseCase.execute(seatUpdateInput);

    expect(response.seat).toBeInstanceOf(Seat);
    expect(response.seat.updatedAt).toBeDefined();
    expect(response.seat.journeyId).toBe(seatUpdateInput.journeyId);
  });
});
