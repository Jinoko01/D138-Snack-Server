import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SnacksService } from './snacks.service';
import { AddSnackDto } from './dto/add-snack.dto';
import { UpdateSnackDto } from './dto/update-snack.dto';

@Controller('snacks')
export class SnacksController {
  constructor(private readonly snackService: SnacksService) {}

  @Get()
  async getSnacks() {
    return await this.snackService.getSnacks();
  }

  @Post()
  async addSnack(@Body() addSnackDto: AddSnackDto) {
    return await this.snackService.addSnack(addSnackDto);
  }

  @Patch(':id/link')
  async updateSnackLink(
    @Param('id') id: string,
    @Body() updateSnackDto: UpdateSnackDto,
  ) {
    return await this.snackService.updateSnackLink(id, updateSnackDto);
  }

  @Delete(':id')
  async removeSnack(@Param('id') id: string) {
    return await this.snackService.removeSnack(id);
  }
}
