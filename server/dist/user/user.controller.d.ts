import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(id: string): Promise<{
        user: import("../entities/user.entity").User;
        followCount: number;
        followedCount: number;
        murmurs: import("../entities/murmur.entity").Murmur[];
    }>;
    follow(followingId: string, followerId: number): Promise<import("../entities/follow.entity").Follow>;
    unfollow(followingId: string, followerId: number): Promise<import("../entities/follow.entity").Follow>;
}
