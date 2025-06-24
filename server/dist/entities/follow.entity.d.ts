import { User } from './user.entity';
export declare class Follow {
    followerId: number;
    followingId: number;
    follower: User;
    following: User;
}
