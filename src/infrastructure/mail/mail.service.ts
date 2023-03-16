import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendCreateReservationNotification } from 'src/utils/types/send-create-reservation-notification.type';
import { MailService as IMailService } from 'src/application/services/mail.service';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendCreateReservationNotification(
    params: SendCreateReservationNotification,
  ) {
    await this.mailerService.sendMail({
      to: params.email,
      subject: 'Reservation de billet',
      template: `./create-reservation.hbs`,
      context: {
        ...params,
        date: new Date(params.journeyDepartureDate).toLocaleDateString(),
        time: new Date(params.journeyDepartureDate).toLocaleTimeString(),
      },
    });
  }

  async sendCancelReservationNotification(params) {
    await this.mailerService.sendMail({
      to: params.email,
      subject: 'Annulation de reservation',
      template: `./cancel-reservation.hbs`,
      context: {
        ...params,
        date: new Date(params.journeyDepartureDate).toLocaleDateString(),
        time: new Date(params.journeyDepartureDate).toLocaleTimeString(),
      },
    });
  }
}
