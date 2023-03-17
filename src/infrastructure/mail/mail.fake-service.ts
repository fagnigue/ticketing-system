import { Injectable } from '@nestjs/common';
import { SendCreateReservationNotification } from 'src/utils/types/send-create-reservation-notification.type';
import { MailService as IMailService } from 'src/application/services/mail.service';

@Injectable()
export class MailFakeService implements IMailService {
  async sendCreateReservationNotification(
    params: SendCreateReservationNotification,
  ) {
    return void 0;
  }

  async sendCancelReservationNotification(params) {
    return void 0;
  }
}
