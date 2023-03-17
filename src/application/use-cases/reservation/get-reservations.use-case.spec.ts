import { Reservation } from 'src/domain/entities/reservation';
import { InMemoryReservationRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.reservation.repository';
import { GetReservationsUseCase } from './get-reservations.use-case';

describe('GetReservationsUseCase', () => {
  it('should return reservation', async () => {
    const reservationRepository = new InMemoryReservationRepository();
    const getReservationsUseCase = new GetReservationsUseCase(
      reservationRepository,
    );

    const response = await getReservationsUseCase.execute({
      userId: '123',
      journeyId: '6411dc3596e3d543f409adc8',
    });

    expect(response).toBeInstanceOf(Array<Reservation>);
  });
});
