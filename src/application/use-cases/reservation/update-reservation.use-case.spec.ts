import { Reservation } from 'src/domain/entities/reservation';
import { InMemoryReservationRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.reservation.repository';
import { UpdateReservationUseCase } from './update-reservation.use-case';

describe('UpdateReservationUseCase', () => {
  it('should update reservation', async () => {
    const reservationRepository = new InMemoryReservationRepository();
    const updateReservationUseCase = new UpdateReservationUseCase(
      reservationRepository,
    );

    const reservationUpdateInput = {
      reservationId: '6412dfc7227e7a656668b6ca',
      seatId: '641215d06031ce3c1ef1ac53',
    };

    const response = await updateReservationUseCase.execute(
      reservationUpdateInput,
    );

    expect(response.reservation).toBeInstanceOf(Reservation);
    expect(response.reservation.seatId).toBe(reservationUpdateInput.seatId);
  });
});
