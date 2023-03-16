import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReservationRepository } from 'src/application/repositories/reservation.repository';
import { MailService } from 'src/application/services/mail.service';
import { Reservation } from 'src/domain/entities/reservation';
import { AlreadyExist } from 'src/utils/constants/exception-messages';
import { UseCase } from '../use-case';

export interface CreateReservationUseCaseRequest {
  userId: string;
  seatId: string;
}

export interface CreateReservationUseCaseResponse {
  reservation: Reservation;
}

@Injectable()
export class CreateReservationUseCase
  implements
    UseCase<CreateReservationUseCaseRequest, CreateReservationUseCaseResponse>
{
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly mailService: MailService,
  ) {}

  async execute(
    data: CreateReservationUseCaseRequest,
  ): Promise<CreateReservationUseCaseResponse> {
    const reservations = await this.reservationRepository.getReservations({
      userId: data.userId,
    });

    let reservation = reservations.find(
      (reservation) =>
        reservation.seatId === data.seatId && !reservation.cancelledAt,
    );

    if (reservation) {
      throw new HttpException(
        AlreadyExist(Reservation.name),
        HttpStatus.BAD_REQUEST,
      );
    }

    reservation = new Reservation(data);

    const createdReservation =
      await this.reservationRepository.createReservation(reservation);

    await this.mailService.sendCreateReservationNotification({
      email: createdReservation.user.email,
      firstname: createdReservation.user.firstname,
      reservationId: createdReservation.id,
      journeyLabel: createdReservation.seat.journey.label,
      journeyDepartureDate: createdReservation.seat.journey.departureDate,
    });

    return { reservation: createdReservation };
  }
}
