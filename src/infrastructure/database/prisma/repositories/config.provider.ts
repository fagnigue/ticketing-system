import { JourneyRepository } from 'src/application/repositories/journey.repository';
import { ReservationRepository } from 'src/application/repositories/reservation.repository';
import { SeatRepository } from 'src/application/repositories/seat.repository';
import { UserRepository } from 'src/application/repositories/user.repository';
import { PrismaJourneyRepository } from './prisma.journey.repository';
import { PrismaReservationRepository } from './prisma.reservation.repository';
import { PrismaSeatRepository } from './prisma.seat.repository';
import { PrismaUserRepository } from './prisma.user.repository';

export const ConfigProviders = [
  {
    provide: UserRepository,
    useClass: PrismaUserRepository,
  },
  {
    provide: JourneyRepository,
    useClass: PrismaJourneyRepository,
  },
  {
    provide: SeatRepository,
    useClass: PrismaSeatRepository,
  },
  {
    provide: ReservationRepository,
    useClass: PrismaReservationRepository,
  },
];
