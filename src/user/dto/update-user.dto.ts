import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  age: number;
}
