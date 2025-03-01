import { IsNotEmpty, IsString } from 'class-validator';

export class AddSnackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
