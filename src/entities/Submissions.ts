import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SubmissionAnswer } from "./SubmissionAnswer";
import { Quizzes } from "./Quizzes";

@Index("quiz_id", ["quizId"], {})
@Entity("submissions")
export class Submissions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "quiz_id" })
  quizId: number;

  @Column("varchar", { name: "username", length: 255 })
  username: string;

  @Column("int", { name: "score" })
  score: number;

  @OneToMany(
    () => SubmissionAnswer,
    (submissionAnswer) => submissionAnswer.submission
  )
  submissionAnswers: SubmissionAnswer[];

  @ManyToOne(() => Quizzes, (quizzes) => quizzes.submissions, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "quiz_id", referencedColumnName: "id" }])
  quiz: Quizzes;
}
