import { Reservation } from 'src/domain/entities/reservation';
import { InMemoryReservationRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.reservation.repository';
import { GetReservationUseCase } from './get-reservation.use-case';

describe('GetReservationUseCase', () => {
  it('should return reservation', async () => {
    const reservationRepository = new InMemoryReservationRepository();
    const getReservationUseCase = new GetReservationUseCase(
      reservationRepository,
    );

    const response = await getReservationUseCase.execute({
      reservationId: '6412dfc7227e7a656668b6ca',
    });

    expect(response.reservation).toBeInstanceOf(Reservation);
    expect(response.reservation.id).toBe('6412dfc7227e7a656668b6ca');
  });
});
