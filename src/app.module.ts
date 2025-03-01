import { Module } from '@nestjs/common';
import { SnacksModule } from './snacks/snacks.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';

@Module({
  imports: [SnacksModule, PrismaModule],
  controllers: [AppController],
})
export class AppModule {}
