import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Nghiem' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'nghiem@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 30 })
  @IsOptional()
  @IsNumber()
  age: number;

  // @ApiProperty({ example: '123456' })
  // @IsNotEmpty()
  // password: string;
}
