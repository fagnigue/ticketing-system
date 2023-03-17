import { InMemoryReservationRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.reservation.repository';
import { DeleteReservationUseCase } from './delete-reservation.use-case';

describe('DeleteReservationUseCase', () => {
  it('should delete reservation', async () => {
    const reservationRepository = new InMemoryReservationRepository();
    const deleteReservationUseCase = new DeleteReservationUseCase(
      reservationRepository,
    );

    const response = await deleteReservationUseCase.execute({
      reservationId: '6412e038a2161d3e0ab5b2e0',
    });

    expect(response).toBe(void 0);
  });
});
