import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
import { Murmur } from '../entities/murmur.entity';
import { User } from '../entities/user.entity';
export declare class LikeService {
    private likeRepo;
    private murmurRepo;
    private userRepo;
    constructor(likeRepo: Repository<Like>, murmurRepo: Repository<Murmur>, userRepo: Repository<User>);
    likeMurmur(userId: number, murmurId: number): Promise<Like>;
    unlikeMurmur(userId: number, murmurId: number): Promise<Like>;
}
