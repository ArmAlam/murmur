import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Murmur } from './murmur.entity';

@Entity('likes')
export class Like {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  murmurId: number;

  @ManyToOne(() => User, user => user.likes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Murmur, murmur => murmur.likes, { onDelete: 'CASCADE' })
  murmur: Murmur;
}
