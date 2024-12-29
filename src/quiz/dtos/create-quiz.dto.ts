import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateQuizDto {
  @ApiProperty({ example: 'De thi toan' })
  @IsNotEmpty()
  @IsString()
  title: string;
}
