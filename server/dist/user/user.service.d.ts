import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Murmur } from '../entities/murmur.entity';
import { Follow } from '../entities/follow.entity';
export declare class UserService {
    private userRepo;
    private murmurRepo;
    private followRepo;
    constructor(userRepo: Repository<User>, murmurRepo: Repository<Murmur>, followRepo: Repository<Follow>);
    getUserProfile(userId: number): Promise<{
        user: User;
        followCount: number;
        followedCount: number;
        murmurs: Murmur[];
    }>;
    followUser(followerId: number, followingId: number): Promise<Follow>;
    unfollowUser(followerId: number, followingId: number): Promise<Follow>;
}
