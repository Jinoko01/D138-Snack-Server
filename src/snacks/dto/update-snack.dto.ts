import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSnackDto {
  @IsString()
  @IsNotEmpty()
  link: string;
}
