import { LikeService } from './like.service';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    like(murmurId: string, userId: number): Promise<import("../entities/like.entity").Like>;
    unlike(murmurId: string, userId: number): Promise<import("../entities/like.entity").Like>;
}
