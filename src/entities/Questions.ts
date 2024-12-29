import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Quizzes } from "./Quizzes";
import { SubmissionAnswer } from "./SubmissionAnswer";

@Index("quiz_id", ["quizId"], {})
@Entity("questions")
export class Questions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "quiz_id" })
  quizId: number;

  @Column("varchar", { name: "content", length: 255 })
  content: string;

  @Column("varchar", { name: "option_a", length: 255 })
  optionA: string;

  @Column("varchar", { name: "option_b", length: 255 })
  optionB: string;

  @Column("varchar", { name: "option_c", length: 255 })
  optionC: string;

  @Column("varchar", { name: "option_d", length: 255 })
  optionD: string;

  @Column("char", { name: "answer", length: 1 })
  answer: string;

  @ManyToOne(() => Quizzes, (quizzes) => quizzes.questions, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "quiz_id", referencedColumnName: "id" }])
  quiz: Quizzes;

  @OneToMany(
    () => SubmissionAnswer,
    (submissionAnswer) => submissionAnswer.question
  )
  submissionAnswers: SubmissionAnswer[];
}
