import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import * as controllers from './controllers';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { JwtStrategy } from './jwt/jwt.strategy';
import * as UserUseCases from 'src/application/use-cases/user';
import * as JourneyUseCases from 'src/application/use-cases/journey';
import * as SeatUseCases from 'src/application/use-cases/seat';
import * as ReservationUseCases from 'src/application/use-cases/reservation';
import { MailModule } from '../mail/mail.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { IdCheckInterceptor } from './interceptors/id-check.interceptor';

@Module({
  imports: [
    DatabaseModule,
    MailModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [...Object.values(controllers)],
  providers: [
    ...Object.values(UserUseCases),
    ...Object.values(JourneyUseCases),
    ...Object.values(SeatUseCases),
    ...Object.values(ReservationUseCases),
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: APP_INTERCEPTOR,
      useClass: IdCheckInterceptor,
    },
  ],
})
export class HttpModule {}
