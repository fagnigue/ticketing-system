import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigProviders } from './prisma/repositories/config.provider';

@Module({
  imports: [PrismaModule],
  providers: [...ConfigProviders],
  exports: [...ConfigProviders, PrismaModule],
})
export class DatabaseModule {}
