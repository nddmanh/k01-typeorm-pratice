import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { CreateSubmissionDto } from './dtos/create-submission.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async createQuiz(@Body() body: CreateQuizDto) {
    return this.quizService.createQuiz(body);
    // return result;
  }

  @Post(':quizId/question')
  createQuestion(
    @Param('quizId') quizId: string,
    @Body() body: CreateQuestionDto,
  ) {
    return this.quizService.createQuestion(+quizId, body);
  }

  @Get()
  findAll() {
    return this.quizService.getAllQuizzes();
  }

  @Get(':quizId/question')
  getQuestions(@Param('quizId') quizId: string) {
    return this.quizService.getQuestionByQuizId(+quizId);
  }

  @Post(':quizId/submission')
  createSubmission(
    @Param('quizId') quizId: string,
    @Body() body: CreateSubmissionDto,
  ) {
    return this.quizService.createSubmission(+quizId, body);
  }

  @Get('submission/:submissionId')
  getSubmission(@Param('submissionId') submissionId: string) {
    return this.quizService.getSubmissionById(+submissionId);
  }
}
