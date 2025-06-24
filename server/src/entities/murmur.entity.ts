import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Like } from './like.entity';

@Entity('murmurs')
export class Murmur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.murmurs, { eager: true })
  user: User;

  @OneToMany(() => Like, like => like.murmur)
  likes: Like[];
}
