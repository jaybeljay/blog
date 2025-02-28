import { User } from 'src/user/entities/user.entity';
import { TABLES } from '../../database/tables';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: TABLES.POSTS })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  user: User;
}
