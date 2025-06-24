import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Murmur } from '../entities/murmur.entity';
import { Follow } from '../entities/follow.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Murmur)
    private murmurRepo: Repository<Murmur>,

    @InjectRepository(Follow)
    private followRepo: Repository<Follow>,
  ) {}

  async getUserProfile(userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const murmurs = await this.murmurRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });

    const followCount = await this.followRepo.count({ where: { followerId: userId } });
    const followedCount = await this.followRepo.count({ where: { followingId: userId } });

    return {
      user,
      followCount,
      followedCount,
      murmurs,
    };
  }

  async followUser(followerId: number, followingId: number) {
    if (followerId === followingId) throw new Error("Can't follow yourself");

    const user = await this.userRepo.findOneBy({ id: followingId });
    if (!user) throw new NotFoundException('Target user not found');

    const existing = await this.followRepo.findOneBy({ followerId, followingId });
    if (existing) return existing;

    const follow = this.followRepo.create({ followerId, followingId });
    return this.followRepo.save(follow);
  }

  async unfollowUser(followerId: number, followingId: number) {
    const follow = await this.followRepo.findOneBy({ followerId, followingId });
    if (!follow) throw new NotFoundException('Not following');

    return this.followRepo.remove(follow);
  }
}
