import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { HttpModule } from './infrastructure/http/http.module';
import { MailModule } from './infrastructure/mail/mail.module';

@Module({
  imports: [
    DatabaseModule,
    HttpModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
