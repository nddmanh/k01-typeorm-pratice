import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;
}

// npx typeorm-model-generator -h sql.freedb.tech -d freedb_k01-nestjs -p 3306 -u freedb_manhnd2 -x tbs%266%21vAg%26%3F9mbc -e mysql

// npx typeorm-model-generator -h sql.freedb.tech -d freedb_k01-nestjs -p 3306 -u freedb_manhnd2 -x tbs&6!vAg&?9mbc -e mysql
