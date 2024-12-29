import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { Quizzes } from 'src/entities/Quizzes';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { Questions } from 'src/entities/Questions';
import { CreateSubmissionDto } from './dtos/create-submission.dto';
import { Submissions } from 'src/entities/Submissions';
import { SubmissionAnswer } from 'src/entities/SubmissionAnswer';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quizzes)
    private quizRepository: Repository<Quizzes>,
    @InjectRepository(Questions)
    private questionRepository: Repository<Questions>,
    @InjectRepository(Submissions)
    private submissionRepository: Repository<Submissions>,
    @InjectRepository(SubmissionAnswer)
    private submissionAnswerRepository: Repository<SubmissionAnswer>,
  ) {}

  async createQuiz(body: CreateQuizDto) {
    const quiz = this.quizRepository.create(body);
    return this.quizRepository.save(quiz);
  }

  async createQuestion(quizId: number, body: CreateQuestionDto) {
    const question = this.questionRepository.create({
      ...body,
      quizId: quizId,
    });
    return await this.questionRepository.save(question);
  }

  async getAllQuizzes() {
    return await this.quizRepository.find();
  }

  async getQuestionByQuizId(quizId: number) {
    return await this.questionRepository.find({
      where: { quizId: quizId },
      select: ['id', 'content', 'optionA', 'optionB', 'optionC', 'optionD'],
    });
  }

  async createSubmission(quizId: number, body: CreateSubmissionDto) {
    console.log(quizId);
    console.log(body);
    // tạo ra 1 bản ghi submission (lưu vào DB)
    const submission = this.submissionRepository.create({
      username: body.username,
      quizId: quizId,
      score: 0,
    });
    const savedSubmission = await this.submissionRepository.save(submission);

    // handle logic kiểm tra anwer của user

    let totalScore = 0;
    for (const anwer of body.answers) {
      // tìm đáp án của câu hỏi ==> dùng để so sánh
      const question = await this.questionRepository.findOne({
        where: { id: anwer.questionId },
      });

      // Kiểm tra đáp án
      let isCorrect = false;
      if (question.answer === anwer.answer) {
        isCorrect = true;
        totalScore++;
      }

      // lưu lại answer của user
      const submissionAnswer = this.submissionAnswerRepository.create({
        submissionId: savedSubmission.id,
        questionId: anwer.questionId,
        answer: anwer.answer,
        isCorrect: isCorrect,
      });
      await this.submissionAnswerRepository.save(submissionAnswer);
    }

    // lưu lại điểm của bài thi
    savedSubmission.score = totalScore;
    return this.submissionRepository.save(savedSubmission);
  }

  async getSubmissionById(submissionId: number) {
    return await this.submissionRepository.findOne({
      where: { id: submissionId },
      relations: ['submissionAnswers'],
    });
  }
}
