import { Repository } from 'typeorm';
import { Murmur } from '../entities/murmur.entity';
import { User } from '../entities/user.entity';
export declare class MurmurService {
    private murmurRepo;
    private userRepo;
    constructor(murmurRepo: Repository<Murmur>, userRepo: Repository<User>);
    createMurmur(userId: number, content: string): Promise<Murmur>;
    deleteMurmur(murmurId: number, userId: number): Promise<Murmur>;
    getTimeline(userId: number, page?: number, limit?: number): Promise<Murmur[]>;
    getMurmurDetail(id: number): Promise<Murmur>;
}
