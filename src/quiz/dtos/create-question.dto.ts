import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateQuestionDto {
  @ApiProperty({ example: '1 + 1 = ?' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsString()
  optionA: string;

  @ApiProperty({ example: '2' })
  @IsNotEmpty()
  @IsString()
  optionB: string;

  @ApiProperty({ example: '4' })
  @IsNotEmpty()
  @IsString()
  optionC: string;

  @ApiProperty({ example: '5' })
  @IsNotEmpty()
  @IsString()
  optionD: string;

  @ApiProperty({ example: 'A' })
  @IsNotEmpty()
  @IsString()
  answer: string;
}
