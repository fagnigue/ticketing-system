import { Injectable } from '@nestjs/common';
import { ReservationRepository } from 'src/application/repositories/reservation.repository';
import { MailService } from 'src/application/services/mail.service';
import { Reservation } from 'src/domain/entities/reservation';
import { UseCase } from '../use-case';

export interface CancelReservationUseCaseRequest {
  reservationId: string;
}

export interface CancelReservationUseCaseResponse {
  reservation: Reservation;
}

@Injectable()
export class CancelReservationUseCase
  implements
    UseCase<CancelReservationUseCaseRequest, CancelReservationUseCaseResponse>
{
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly mailService: MailService,
  ) {}

  async execute(
    data: CancelReservationUseCaseRequest,
  ): Promise<CancelReservationUseCaseResponse> {
    const { reservationId } = data;
    const reservation = await this.reservationRepository.getReservation(
      reservationId,
    );

    reservation.cancel();

    const updatedReservation =
      await this.reservationRepository.updateReservation(reservation);

    await this.mailService.sendCancelReservationNotification({
      email: updatedReservation.user.email,
      firstname: updatedReservation.user.firstname,
      reservationId: updatedReservation.id,
      journeyLabel: updatedReservation.seat.journey.label,
      journeyDepartureDate: updatedReservation.seat.journey.departureDate,
    });

    return { reservation: updatedReservation };
  }
}
