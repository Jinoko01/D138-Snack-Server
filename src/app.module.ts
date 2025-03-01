import { Module } from '@nestjs/common';
import { SnacksModule } from './snacks/snacks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SnacksModule, PrismaModule],
})
export class AppModule {}
