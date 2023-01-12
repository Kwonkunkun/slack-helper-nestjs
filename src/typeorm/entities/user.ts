import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * TODO: 나중에 정의해야함 일단 임시로 만듬
 */
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;
}
