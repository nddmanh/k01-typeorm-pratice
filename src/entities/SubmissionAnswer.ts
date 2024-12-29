import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Submissions } from "./Submissions";
import { Questions } from "./Questions";

@Index("question_id", ["questionId"], {})
@Index("submission_id", ["submissionId"], {})
@Entity("submission_answer")
export class SubmissionAnswer {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "submission_id" })
  submissionId: number;

  @Column("int", { name: "question_id" })
  questionId: number;

  @Column("char", { name: "answer", length: 1 })
  answer: string;

  @Column("tinyint", { name: "is_correct", width: 1 })
  isCorrect: boolean;

  @ManyToOne(
    () => Submissions,
    (submissions) => submissions.submissionAnswers,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "submission_id", referencedColumnName: "id" }])
  submission: Submissions;

  @ManyToOne(() => Questions, (questions) => questions.submissionAnswers, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
  question: Questions;
}
