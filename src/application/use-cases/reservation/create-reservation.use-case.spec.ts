import { Reservation } from 'src/domain/entities/reservation';
import { InMemoryReservationRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.reservation.repository';
import { MailFakeService } from 'src/infrastructure/mail/mail.fake-service';
import { CreateReservationUseCase } from './create-reservation.use-case';

describe('CreateReservationUseCase', () => {
  it('should create reservation and return it', async () => {
    const reservationRepository = new InMemoryReservationRepository();
    const mailService = new MailFakeService();
    const createReservationUseCase = new CreateReservationUseCase(
      reservationRepository,
      mailService,
    );

    const reservationCreateInput = {
      userId: '',
      seatId: '',
    };

    const response = await createReservationUseCase.execute(
      reservationCreateInput,
    );

    expect(response.reservation).toBeInstanceOf(Reservation);
    expect(response.reservation.id).toBeDefined();
    expect(response.reservation.createdAt).toBeInstanceOf(Date);
  });
});
