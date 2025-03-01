import { Module } from '@nestjs/common';
import { SnacksController } from './snacks.controller';
import { SnacksService } from './snacks.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SnacksController],
  providers: [SnacksService, PrismaService],
})
export class SnacksModule {}
