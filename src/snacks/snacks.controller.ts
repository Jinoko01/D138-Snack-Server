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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Snack } from './entities/snack.entity';

@Controller('snacks')
@ApiTags('SNACKS: 간식 리스트 관리')
export class SnacksController {
  constructor(private readonly snackService: SnacksService) {}

  @Get()
  @ApiOperation({ summary: '간식 리스트 조회' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: [Snack],
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  async getSnacks() {
    return await this.snackService.getSnacks();
  }

  @Post()
  @ApiOperation({ summary: '간식 추가' })
  @ApiBody({ type: AddSnackDto })
  @ApiResponse({
    status: 201,
    description: '성공',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  async addSnack(@Body() addSnackDto: AddSnackDto) {
    return await this.snackService.addSnack(addSnackDto);
  }

  @Patch(':id/link')
  @ApiOperation({ summary: '간식 링크 수정' })
  @ApiBody({ type: UpdateSnackDto })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  async updateSnackLink(
    @Param('id') id: string,
    @Body() updateSnackDto: UpdateSnackDto,
  ) {
    return await this.snackService.updateSnackLink(id, updateSnackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '간식 삭제' })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  async removeSnack(@Param('id') id: string) {
    return await this.snackService.removeSnack(id);
  }
}
