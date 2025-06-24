import { Murmur } from './murmur.entity';
import { Like } from './like.entity';
import { Follow } from './follow.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    murmurs: Murmur[];
    likes: Like[];
    following: Follow[];
    followers: Follow[];
}
