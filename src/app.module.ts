import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QuizModule } from './quiz/quiz.module';
import { Quizzes } from './entities/Quizzes';
import { Questions } from './entities/Questions';
import { Submissions } from './entities/Submissions';
import { SubmissionAnswer } from './entities/SubmissionAnswer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql.freedb.tech',
      port: 3306,
      username: 'freedb_manhnd2',
      password: 'tbs&6!vAg&?9mbc',
      database: 'freedb_k01-nestjs',
      entities: [User, Quizzes, Questions, Submissions, SubmissionAnswer],
      logging: true,
      // synchronize: true,

      //npx typeorm-model-generator -h sql.freedb.tech -d freedb_k01-nestjs -p 3306 -u freedb_manhnd2 -x 'tbs&6!vAg&?9mbc' -e mysql
    }),
    UserModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}


