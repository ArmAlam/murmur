import { User } from './user.entity';
import { Like } from './like.entity';
export declare class Murmur {
    id: number;
    content: string;
    createdAt: Date;
    user: User;
    likes: Like[];
}
