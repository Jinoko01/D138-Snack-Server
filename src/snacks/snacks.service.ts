import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddSnackDto } from './dto/add-snack.dto';
import { UpdateSnackDto } from './dto/update-snack.dto';

@Injectable()
export class SnacksService {
  constructor(private prisma: PrismaService) {}

  async getSnacks() {
    return await this.prisma.snack.findMany();
  }

  async addSnack(addSnackDto: AddSnackDto) {
    const { name } = addSnackDto;
    return await this.prisma.snack.create({
      data: { name },
    });
  }

  async updateSnackLink(id: string, updateSnackDto: UpdateSnackDto) {
    const snack = await this.prisma.snack.findUnique({ where: { id } });
    if (!snack) {
      throw new NotFoundException(`Snack with id ${id} not found`);
    }
    return await this.prisma.snack.update({
      where: { id },
      data: { link: updateSnackDto.link },
    });
  }

  async removeSnack(id: string) {
    const snack = await this.prisma.snack.findUnique({ where: { id } });
    if (!snack) {
      throw new NotFoundException(`Snack with id ${id} not found`);
    }
    return await this.prisma.snack.delete({ where: { id } });
  }
}
