import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
import { Murmur } from '../entities/murmur.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepo: Repository<Like>,

    @InjectRepository(Murmur)
    private murmurRepo: Repository<Murmur>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async likeMurmur(userId: number, murmurId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    const murmur = await this.murmurRepo.findOneBy({ id: murmurId });

    if (!user || !murmur) throw new NotFoundException('User or Murmur not found');

    const alreadyLiked = await this.likeRepo.findOneBy({ userId, murmurId });
    if (alreadyLiked) return alreadyLiked;

    const like = this.likeRepo.create({ userId, murmurId, user, murmur });
    return this.likeRepo.save(like);
  }

  async unlikeMurmur(userId: number, murmurId: number) {
    const like = await this.likeRepo.findOneBy({ userId, murmurId });
    if (!like) throw new NotFoundException('Like not found');

    return this.likeRepo.remove(like);
  }
}
