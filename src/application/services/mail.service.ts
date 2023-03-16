import { SendCancelReservationNotification } from 'src/utils/types/send-cancel-reservation-notification.type';
import { SendCreateReservationNotification } from 'src/utils/types/send-create-reservation-notification.type';

export abstract class MailService {
  abstract sendCreateReservationNotification(
    params: SendCreateReservationNotification,
  ): Promise<void>;
  abstract sendCancelReservationNotification(
    params: SendCancelReservationNotification,
  ): Promise<void>;
}
