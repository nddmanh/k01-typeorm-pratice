import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quizzes } from 'src/entities/Quizzes';
import { Questions } from 'src/entities/Questions';
import { Submissions } from 'src/entities/Submissions';
import { SubmissionAnswer } from 'src/entities/SubmissionAnswer';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quizzes,
      Questions,
      Submissions,
      SubmissionAnswer,
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
