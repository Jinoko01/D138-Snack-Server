import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddSnackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '초코파이',
    description: '간식 이름',
    required: true,
  })
  name: string;
}
