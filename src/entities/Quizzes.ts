import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Questions } from "./Questions";
import { Submissions } from "./Submissions";

@Entity("quizzes")
export class Quizzes {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @OneToMany(() => Questions, (questions) => questions.quiz)
  questions: Questions[];

  @OneToMany(() => Submissions, (submissions) => submissions.quiz)
  submissions: Submissions[];
}
