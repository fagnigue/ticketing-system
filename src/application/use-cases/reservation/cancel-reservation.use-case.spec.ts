import { Reservation } from 'src/domain/entities/reservation';
import { InMemoryReservationRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.reservation.repository';
import { MailFakeService } from 'src/infrastructure/mail/mail.fake-service';
import { CancelReservationUseCase } from './cancel-reservation.use-case';

describe('CancelReservationUseCase', () => {
  it('should cancel reservation', async () => {
    const reservationRepository = new InMemoryReservationRepository();
    const mailService = new MailFakeService();
    const cancelReservationUseCase = new CancelReservationUseCase(
      reservationRepository,
      mailService,
    );

    const response = await cancelReservationUseCase.execute({
      reservationId: '6412dfc7227e7a656668b6ca',
    });

    expect(response.reservation).toBeInstanceOf(Reservation);
    expect(response.reservation.cancelledAt).toBeDefined();
  });
});
