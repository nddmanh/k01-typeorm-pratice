import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

class Answer {
  @IsNotEmpty()
  @IsNumber()
  questionId: number;

  @IsNotEmpty()
  @IsString()
  answer: string;
}

export class CreateSubmissionDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: [
      { questionId: 1, answer: 'A' },
      { questionId: 2, answer: 'B' },
    ],
  })
  @IsArray()
  answers: Answer[];
}
