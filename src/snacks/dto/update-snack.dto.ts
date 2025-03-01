import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSnackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://www.google.com',
    description: '구매 링크',
    required: true,
  })
  link: string;
}
