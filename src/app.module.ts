import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnacksController } from './snacks/snacks.controller';
import { SnacksService } from './snacks/snacks.service';
import { SnacksModule } from './snacks/snacks.module';

@Module({
  imports: [SnacksModule],
  controllers: [AppController, SnacksController],
  providers: [AppService, SnacksService],
})
export class AppModule {}
