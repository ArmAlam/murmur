import { User } from './user.entity';
import { Murmur } from './murmur.entity';
export declare class Like {
    userId: number;
    murmurId: number;
    user: User;
    murmur: Murmur;
}
